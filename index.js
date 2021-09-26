const { Pool } = require("pg");
const Cursor = require("pg-cursor");

const date = new Date();
const fechaActual = date.toLocaleDateString();

const argumentos = process.argv.slice(2);

let tipoConsulta = argumentos[0];
let id = argumentos[1];
let monto = argumentos[2];

const config = {
  user: "postgres",
  host: "localhost",
  database: "banco",
  password: "admin",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

/* - 1.Crear una función asíncrona que registre una nueva transacción utilizando valores
    ingresados como argumentos en la línea de comando. Debe mostrar por consola la
    última transacción realizada. */

if (tipoConsulta == "retiro") {
  pool.connect(async (error_conexion, client, release) => {
    if (error_conexion) return console.error(error_conexion.code);
    try {
      await client.query("BEGIN");

      const retiro = {
        name: "update-saldo",
        text: "UPDATE cuentas SET saldo = saldo - $1 WHERE id_cuenta = $2 RETURNING *;",
        values: [monto, id],
      };
      const inforetiro = await client.query(retiro);

      console.log({ RETIRO: inforetiro.rows[0] });

      await client.query("COMMIT");

      await insert(client); // Se llama a la funcion async para insertar los datos en la tabla transacciones
    } catch (e) {
      await client.query("ROLLBACK");
      console.log(e);
    }
    release();
  });
}

/* - 2.Realizar una función asíncrona que consulte la tabla de transacciones y retorne
    máximo 10 registros de una cuenta en específico. Debes usar cursores para esto. */

if (tipoConsulta == "consulta") {
  pool.connect((error_conexion, client, release) => {
    if (error_conexion) return console.error(error_conexion.code);

    const consulta = new Cursor("select * from transacciones");

    const cursor = client.query(consulta);

    cursor.read(10, (err, rows) => {
      console.log(rows);

      cursor.close();

      release();
    });
  });
}

/* - 3.Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
    ejecutada con valores ingresados como argumentos en la línea de comando. Debes
    usar cursores para esto. */

if (tipoConsulta == "saldo") {
  pool.connect((error_conexion, client, release) => {
    if (error_conexion) return console.error(error_conexion.code);

    const consulta = new Cursor("select * from cuentas where id_cuenta = $1", [id]);

    const cursor = client.query(consulta);

    cursor.read(1, (err, rows) => {
      console.log({ SALDO: rows[0] });

      cursor.close();

      release();
    });
  });
}

async function insert(client) {
  try {
    await client.query("BEGIN");

    const res = await client.query("insert into transacciones (descripcion, fecha, monto, cuenta) values ($1, $2, $3, $4) RETURNING *;", [tipoConsulta, fechaActual, monto, id]);

    console.log({ TRANSACCION: res.rows[0] });

    await client.query("COMMIT");
    //  - 4.En caso de haber un error en la transacción, se debe retornar el error por consola.
  } catch (e) {
    await client.query("ROLLBACK");
    console.log(e);
  }
}

pool.end();

# Desafío - Mi Banco

## Autor ✒️

- **Mario Montenegro**
- **Maximiliano Paredes**
- **Eduardo Montenegro**
- **Eric Leiva**

### Requerimientos

- 1.Crear una función asíncrona que registre una nueva transacción utilizando valores
    ingresados como argumentos en la línea de comando. Debe mostrar por consola la
    última transacción realizada.

- 2.Realizar una función asíncrona que consulte la tabla de transacciones y retorne
    máximo 10 registros de una cuenta en específico. Debes usar cursores para esto.

- 3.Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
    ejecutada con valores ingresados como argumentos en la línea de comando. Debes
    usar cursores para esto.
    
- 4.En caso de haber un error en la transacción, se debe retornar el error por consola.


## Modo de utilizar la aplicacion

- PARA UTILIZAR LA APLICACION SE DEBE SEGUIR EL SIGUIENTE ORDEN EN LINEA DE COMANDOS: <tipo_consulta> <id> <monto>

- LOS TIPOS DE CONSULTAS SON: retiro , consulta, consultarsaldo

- PARA REGISTRAR UNA TRANSACCION "RETIRO" SE DEBE INGRESAR: node index.js retiro id monto
  
- PARA CONSULTAR LOS 10 REGISTROS : node index.js consulta

- PARA CONSULTAR SALDO ESPECIFICO node index.js consultarsaldo id 


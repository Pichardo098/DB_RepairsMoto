Base de datos de un taller de reparaciones.

Actualizaciones 08/03/2023 SEMANA 2:
1.-Actualización del modelo de "Reparaciones", se agregaron los atributos "motorsNumber" y "description".
2.-Validación de campos con ayuda de express-validator.
3.-Creación del archivo de variables de entorno.
4.-Implementación de la ruta /login dentro de user.route.
5.-Se encriptan las contraseñas al momento de hacer el registro, al momento de iniciar sesión, tambien cuando se actualiza la contraseña.
6.-Se genera un JWT tanto cuando se registra un usuario, como cuando inicia sesión.
7.-Creación de los middlewares "validRepair" y "validUser" con el fin de optimizar el codigo de los controladores que lo necesitan.
8.-Se crean las siguientes autenticaciones:
-protect:Validar el token que se entrega al usuario cuando inicia sesión o cuando se registra.
-protectAccountOwner: Para proteger la ruta PATCH de user cuando se quiera realizar alguna actualización.
-allowTo: Permitir a los usuarios con ciertos roles que puedan ingresar a rutas protegidas
9.-A todas las rutas de repair se le agrega el protect, ya que un cliente anonimo no puede realizar ninguna acción y se permiten entrar a ciertas rutas solo a los usuario con rol de empleado.
10.-Adicional a eso, a las rutas que GET PATCH DELETE (:id) de user tambien se protegen con el middleware "protect" y a patch se le agrega el "protectAccountOwner" para validar que sea el mismo usuario en sesion como el que ingresa que realizará una actualización en sus datos.

Actualizaciones 08/11/2023 SEMANA 3:
1.-Establecer una relación entre ambos modelos, un usuario puede tener muchas reparaciones pero una reparación puede pertenecer a un solo usuario, de esta manera el empleado podrá encontrar todas las reparación con estatus 'pending' y 'completed' y además podrá visualizar la info del usuario quien realizó la cita.
2.-La autorización queda lista para que solo los usuarios puedan actualizar o eliminar su cuenta, validando la información del cliente por medio del token.
3.-Ahora los empleados podrán buscar una reparación con estatus 'pending' o 'completed'.

------Add------
Se crea el endpoint "/myrepairs" con el fin de que cada usuario loggeado pueda encontrar un registro de todas sus reparaciones, sin importar el estatus. Simplemente se valida con el token y se retornan todas las reparaciones.

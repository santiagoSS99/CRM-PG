Para generar el modulo de autenticación, debo primero generar el recurso
```
nest g res auth (En la raiz de mi backend)
en este paso, solo necesito el registro, por lo cual solo dejo el metodo POST y le agrego la ruta ('register')
```
luego creo mi entidad, para este caso usé el user.entity.ts con los campos 

id: string;
email: string
password: string
fullName: string
isActive: boolean
roles: string[];

el segundo paso es crear mi DTO

para este caso usé create-user.dto.ts

@IsEmail()
@IsString()
email: string

@IsString()
@MinLength(6)
@MaxLength(50)
@Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
})
password: string

@IsString()
@MinLength(2)
fullName: string


el tercer paso es entrar al auth.service.ts, injecto el repositorio dentro de mi clase declarada en el AuthService y dentro del constructor (si no está, se crea dentro de mi clase AuthService)

constructor(
    @InjectRepository()
    private readonly userRepository: Repository<User>
){}

Cabe resaltar que User es la referencia a la entidad que se creó de primero

el cuarto paso es hacer un trychatch dentro del metodo create

try {
    <!-- en esta parte debo de usar el repositorio que inyecté -->
    const x_cosa = this.userRepository.create(<!--acá le pasamos el DTO--> createUserDto)
    await this.userRepository.save(<!--acá se le pasa x_cosa--> x_cosa)
} catch(error) {
    console.log(error)
}

el quinto paso es encriptar la contraseña para que no salga en la base de datos

```
npm i bcrypt
npm i -D @types/bcrypt
```
despues de instalar esos paquetes, edito el create de mi servicio
en ese paso lo que hicimos fue desestructurar lo que lleca en createUserDto, para decirle que la contraseña debe de ser encriptada, se hace de la siguiente manera

import * as bcrypt from 'bcrypt'

cabe aclarar que tenemos que realizar la importación 

try {
      const { password, ...userDates } = createUserDto
      const user = this.userRepository.create({
        ...userDates,
        password: bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user)
      delete user.password
      return user
} catch (error) {
      console.log(error)
    }





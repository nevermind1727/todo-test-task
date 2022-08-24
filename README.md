Использовал Nest.js with MongoDB(mongoose).
Решил немного подзаморочиться и реализовать авторизацию по jwt-токену.

## Краткое описание эндпоинтов:
/auth:
* POST - /auth/registration - регистрация пользователя, входные данные email и password.
* POST - /auth/login - логин пользователя, входные данные email и password.

/todos:
* POST - /todos - создание todo, входные данные title и text.
* GET - /todos?completed=true/false - получение всех todos, у которых поле isCompleted соответсвует значению в query.
* GET - /todos:id - получение todo по id, переданному в params.
* PATCH - /todos:id - изменение todo по id, входные данные title, text и isCompleted.
* DELETE - /todos:id - удаление todo по id.

## Краткое описание схем сущностей:
### UserSchema:
```
{
  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }] })
  todos: Todo[];
}
```
### TodoSchema:
```
{
  @Prop({required: true})
  title: string;

  @Prop()
  text: string;

  @Prop({default: false})
  isCompleted: boolean;
}
```

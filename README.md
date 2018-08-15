# Todo app front end

The application lets you create and manipulate with tasks organised into lists. Initially, I was to have also implemented users system, where one could sign up and log in, but ran out of time.

Pay attention:
* Press enter to save changes when editing title of a todo list or a todo
* Click on todo's text to cross it out

## Features

* Todo lists: create, delete, move and change title
* Todos: create, delete, move, change title and complete
* All changes are saved to a back end server
* A little bit of responsive design was made

## Launch

Firstly, you need to run [back end server](https://github.com/SkyFlame00/todo-app-backend). After you have done so, execute the following scripts from the root folder:

```
npm i
ng serve --port 5000
```

That is, local front end server must be served on [http://localhost:5000](http://localhost:5000), while back end is served on [http://localhost:7000](http://localhost:7000).

## Sample server

Sample server is available at [http://185.174.173.130:5000/](http://185.174.173.130:5000/).

## Notes
* There is somewhat inconsistency in utilizing services when delegating particular actions from child to parent components
* Routes are too specific and not generic
* Repetitive code

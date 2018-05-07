const Projects = ( () => {

    let projects = {};

    const addProject = (project_name,obj) => {
      projects[project_name] = obj;
    }

    const removeProject = (project_name) => {
      delete projects[project_name];
    }

    const getProjects = () => {
      return projects;
    }
    return {addProject,removeProject,getProjects};

} )();



const Project = (project_name) => {

    let name = project_name;
    let Todos = {};

    const addTodo = (todo_name,obj) => {
      Todos[todo_name] = obj;
    }

    const removeTodo = (todo_name) => {
      delete Todos[todo_name];
    }

    const getName = () => {
      return name;
    }

    const getTodos = () => {
      return Todos;
    }

    return {addTodo,removeTodo,getName,getTodos};

};



const ToDo = () => {

    let Title;
    let Description;

    const setTitle = (title) => {
      Title = title;
    }

    const setDescription = (description) => {
      Description = description;
    }

    const getTitle = () => {
      return Title;
    }

    const getDescription = () => {
      return Description;
    }

    return {setTitle,setDescription,getTitle,getName};
};

export {Projects,Project,ToDo};

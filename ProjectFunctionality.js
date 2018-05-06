const Projects = ( () => {

    let projects = {};

    const AddProject = (project_name,obj) => {
      projects[project_name] = obj;
    }

    const RemoveProject = (project_name) => {
      delete projects[project_name];
    }

    return {AddProject,RemoveProject};

} )();



const Project = (project_name) => {

    let name = project_name;
    let Todos = {};

    const AddTodo = (todo_name,obj) => {
      Todos[todo_name] = obj;
    }

    const RemoveTodo = (todo_name) => {
      delete Todos[todo_name];
    }

    const getName = () => {
      return name;
    }

    return {AddTodo,RemoveTodo,getName};

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

    const getTitle = (){
      return Title;
    }

    const getDescription = () => {
      return Description;
    }

    return {setTitle,setDescription,getTitle,getName};
};

export {Projects,Project,ToDo};

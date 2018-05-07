const Projects = ( () => {

    let projects = {};
    let current_project ;

    const addProject = (project_name,obj) => {
      projects[project_name] = obj;
      setCurrentProject(project_name);
      PubSub.publish("add project",project_name);
    }

    const removeProject = (project_name) => {
      delete projects[project_name];
    }

    const getProject = (p_name) => {
      return projects[p_name];
    }

    const setCurrentProject = (cp) => {
      current_project =   cp;
    };

    const getCurrentProject = () => {
      return current_project;
    }

    return {addProject,removeProject,getProject,setCurrentProject,getCurrentProject};

} )();



const Project = (project_name) => {

    let name = project_name;
    let Todos = {};

    const addTodo = (todo_name,obj) => {
      Todos[todo_name] = obj;
      PubSub.publish("add todo",[project_name,todo_name,obj]);
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



const ToDo = (title="",description="") => {

    let Title = title;
    let Description = description;

    const getTitle = () => {
      return Title;
    }

    const getDescription = () => {
      return Description;
    }

    return {getTitle,getDescription};
};

export {Projects,Project,ToDo};

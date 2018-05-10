import 'pubsub-js';
import {Projects,Project,ToDo} from '../dist/ProjectFunctionality.js';
import {Render} from '../dist/render.js';

const todoApp = (() => {


    const addProject = (() => {
      $('.new-project-card button').click(() => {
        let project_name = getProjectName();
        let project = createProject(project_name);
        getProjectsObj().addProject(project_name,project);
      })
    })();


    const getProjectName = () => {
      return $('.new-project-card input').val();
    }


    const createProject = (project_name) => {
      return Project(project_name);
    }


    const addTodo = (() => {
      $(".Add-Task button").click(() => {
        let todo_title = getTodoTitle();
        let todo_descrip = getTodoDescription();
        let todo_priority = getTodoPriority();
        let curr_proj = getCurrentProject();
        let Todo = ToDo(todo_title,todo_descrip,todo_priority);
        getProjectsObj().getProject(curr_proj).addTodo(todo_title,Todo);
      })
    })()


    const getTodoPriority = () => {
      return $(".priority").html() ;
    }


    const getTodoTitle = () => {
      return $(".title").val();
    }


    const getTodoDescription = () => {
      return $(".notes textarea").val();
    }


    const selectedProject = (projects) => {
      projects.forEach((project) => {
        project.onclick = (e) => {
          let curr_proj = e.currentTarget.innerHTML;
          getProjectsObj().setCurrentProject(curr_proj);
          // for viewing todos of current project
          let curr_proj_obj = getProjectsObj().getProject(curr_proj);
          PubSub.publish("current project",curr_proj_obj);
        }
      })
    }


    const changeProject = (() => {
      //required for jumping on to newly created project
      PubSub.subscribe('project added', () => {
        let projects = document.querySelectorAll(".project p");
        selectedProject(projects);
      })
      //required when switching to an existing project
      let projects = document.querySelectorAll(".project p");
      selectedProject(projects);
    })();


    const getCurrentProject = () => {
      let curr_proj_name = getProjectsObj().getCurrentProject();
      return curr_proj_name;
    };

    const setCurrentProject = (project_name) =>{
      getProjectsObj().setCurrentProject(project_name);
      PubSub.publish("current project changed",project_name);
    }

    const getProjectsObj = () => {
      return Projects;
    }

    const getTodoObj = () => {
      return ToDo;
    }


    const removeTodo = (() => {

        const CheckForRemovalAndRemove = () =>{
          let ticks = document.querySelectorAll(".completion-tick");
          ticks.forEach((tick) => {
            tick.onclick = (e)=> {
              let todo_name = $(e.currentTarget).attr('class').split(" ")[1];
              let parent =  getCurrentProject();
              getProjectsObj().getProject(parent).removeTodo(todo_name);
              PubSub.publish("remove todo DOM",todo_name);
            }

          })
        }

        PubSub.subscribe("todo-added",(msg)=>{
          CheckForRemovalAndRemove();
        })

        PubSub.subscribe("project-changed",(msg)=>{
          CheckForRemovalAndRemove();
        })

    })();

    const setNewCurrentProjectAfterDeletion = () => {
      let remaining_projects = getProjectsObj().getNumberOfProjects();
      if (remaining_projects >0) {
        let projects = getProjectsObj().getProjects();
        let new_current_project = Object.keys(projects)[Object.keys(projects).length -1]
        setCurrentProject(new_current_project);
        PubSub.publish("current project changed",new_current_project);
      }
      else {
        setCurrentProject(null);
      }

    }

    const removeProject = (() => {
      $(".remove-project-btn").click(() => {
        let current_project_name = getCurrentProject();
        getProjectsObj().removeProject(current_project_name);

        setNewCurrentProjectAfterDeletion();

        let projects = getProjectsObj().getProjects();
        PubSub.publish("remove-project",[current_project_name,projects]);
      })
    })();

    return {};
})();

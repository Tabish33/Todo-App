import 'pubsub-js';
import {Projects,Project,ToDo} from '../dist/ProjectFunctionality.js';
import {Render} from '../dist/render.js';

const todoApp = (() => {

    const addProject = (() => {
      $('.new-project-card button').click(() => {
        let project_name = $('.new-project-card input').val();
        let project = Project(project_name);
        getProjectsObj().addProject(project_name,project);
      })
    })();

    const addTodo = (() => {
      $(".Add-Task button").click(() => {
        let todo_title = $(".title").val();
        let todo_descrip = $(".notes textarea").val();
        let Todo = ToDo(todo_title,todo_descrip);
        let curr_proj = getCurrentProject();
        getProjectsObj().getProject(curr_proj).addTodo(todo_title,Todo);
      })
    })()

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
      let projects = document.querySelectorAll(".project p");
      PubSub.subscribe('project added', () => {
        let projects = document.querySelectorAll(".project p");
        selectedProject(projects);
      })
        selectedProject(projects);
    })();


    const getCurrentProject = () => {
      return getProjectsObj().getCurrentProject();
    };



    const getProjectsObj = () => {
      return Projects;
    }

    return {};
})();

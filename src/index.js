import 'pubsub-js';
import {Projects,Project,ToDo} from '../dist/ProjectFunctionality.js';
import {Render} from '../dist/render.js';

const todoApp = (() => {

    const addProject = (() => {
      $('.new-project-card button').click(() => {
        let project_name = $('.new-project-card input').val();
        let project = Project(project_name);
        Projects.addProject(project_name,project);
      })
    })();

    const setCurrentProject = (() => {
      PubSub.subscribe('project added', () => {
        let projects = document.querySelectorAll(".project p");
        projects.forEach((project) => {
          project.onclick = (e) => {
            let curr_proj = e.currentTarget.innerHTML;
            Projects.setCurrentProject(curr_proj);
          }
        })
      })
    })();

    const getCurrentProject = () => {
      return Projects.getCurrentProject();
    };

    const addTodo = (() => {
      $(".Add-Task button").click(() => {
        let todo_title = $(".title").val();
        let todo_descrip = $(".notes textarea").val();
        let Todo = ToDo(todo_title,todo_descrip);
        let curr_proj = getCurrentProject();
        Projects.getProject(curr_proj).addTodo(todo_title,Todo);
      })
    })()

    return {};
})();

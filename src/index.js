import 'pubsub-js';
import {Projects,Project,ToDo} from '../dist/ProjectFunctionality.js';
import {Render} from '../dist/render.js';

const todoApp = (() => {

    const addProject = (() => {
      $('.new-project-card button').click(() => {
        let project_name = $('.new-project-card input').val();
        let project = Project(project_name);
        Projects.addProject(project_name,project);
        Render.viewProjects(project);
      })
    })();

    return {};
})();

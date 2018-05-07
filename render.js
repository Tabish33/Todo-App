const Render = ( () => {

    const viewTodoCard = (() => {
      $('.new-task-btn').click(() => {
        $(".Todo-card").css('display','grid');
      })
    })();

    const closeTodoCard = (() => {
      $('.close-todo-card').click(() => {
        $(".Todo-card").css('display','none');
      })
    })();

    const viewProjectCard = (() => {
      $('.new-project-btn').click(() => {
        $(".new-project-card").css('display','grid');
      })
    })();

    const closeProjectCard = (() => {
      $('.close-project-card').click(() => {
        $(".new-project-card").css('display','none');
      })
    })();

    const viewProjects = (() => {

      PubSub.subscribe('add project',(msg,p_name)=>{
        $(".sidebar").append(`<div class="project ${p_name}"><p
                                >${p_name}</p></div>`);
        PubSub.publish("project added");
      })

    })();

    const viewTodos = (() => {
      const viewOnSidebar = (() => {
        PubSub.subscribe("add todo",(msg,data) => {
          let project_name = data[0] ,  todo_name = data[1];
          $(`.${project_name}`).append(`<li>${todo_name}</li>`);
        })
      })();
    })();

    return {};
} )()


export {Render};

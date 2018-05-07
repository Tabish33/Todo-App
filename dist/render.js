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

    const viewProjects = (project) => {
      let p_name = project.getName();
      $(".sidebar").append(`<div data-id="${p_name}" class="project"><p
                              class="${p_name}">${p_name}</p></div>`);
      viewTodos();
    };

    const viewTodos = () => {
      const viewOnSidebar = (() => {
        $('.project p').each(function(){
          $(this).click(()=>{
            let name = $(this).attr('class');
            let project = $(this.parentElement).data('id');
            Object.keys(Projects.getProjects()[project].getTodos()).forEach(function(){
              console.log(this);
            })
          })
        })
      })();
    };

    return {viewProjects};
} )()


export {Render};

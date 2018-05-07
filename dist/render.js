const Render = ( () => {

    const viewTodoCard = (() => {
      $('.new-task-btn').click(() => {
        $(".Todo-card").css('display','grid');
        $(".new-project-card").css('display','none');
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
        $(".Todo-card").css('display','none');
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

    const AddTodosToProjectArea = () =>{}

    const viewTodos = (() => {

        const viewOnSidebar = (() => {
          PubSub.subscribe("add todo",(msg,data) => {
            let project_name = data[0] ,  todo_name = data[1];
            $(`.${project_name}`).append(`<li>${todo_name}</li>`);
          })
        })();

        const viewOnProjectArea = (() => {

            const onProjectChange = (() => {
                PubSub.subscribe("current project", (msg, curr_project_obj) => {
                  $(".project-cards").empty();
                  let todos = curr_project_obj.getTodos() ;
                  for (let todo in todos){
                    let title = todos[todo].getTitle();
                    let description = todos[todo].getDescription();
                    $(".project-cards").append(`
                      <div class="note">
                          <input type="text"  placeholder="Title" value=${title}>
                          <textarea placeholder="Description">${description}</textarea>
                      </div>
                      `)
                  }
                })
            })();

            const onNewProject = (() => {
                PubSub.subscribe("add project", () => { $(".project-cards").empty(); })
            })()

            const onNewTodo = (() => {
                PubSub.subscribe("add todo",(msg,data)=> {
                  let todoObj = data[2];
                  $(".project-cards").append(`
                    <div class="note">
                        <input type="text"  placeholder="Title" value=${todoObj.getTitle()}>
                        <textarea placeholder="Description">${todoObj.getDescription()}</textarea>
                    </div>
                    `)
                })
            })();

        })();
    })();

    return {};
} )()


export {Render};

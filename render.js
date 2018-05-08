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

    const viewTodos = (() => {

        const viewOnSidebar = (() => {
          PubSub.subscribe("todo added",(msg,data) => {
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
                PubSub.subscribe("todo added",(msg,data)=> {
                  let todoObj = data[2];
                  $(".project-cards").append(`
                    <div class="note">
                        <div class="note-details">
                          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path class="${todoObj.getTitle()}-path" class fill="#000000" d="M12,2A10,10 0 0,1 22,12A10,10
                             0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
                          </svg>
                        </div>
                        <input type="text"  placeholder="Title" value=${todoObj.getTitle()}>
                        <textarea placeholder="Description">${todoObj.getDescription()}</textarea>
                    </div>
                    `)
                })
            })();

        })();
    })();

    const showPriorityOnCreateTodoCard = (() => {
      let buttons  = document.querySelectorAll(".priorities button");
      let prev_priority_btn ;
      buttons.forEach((btn) => {
        btn.onclick = (e) => {
          $(`.${e.currentTarget.innerHTML}`).toggleClass("priority")
          if(prev_priority_btn){
            $(`.${prev_priority_btn}`).removeClass("priority")
          }
          prev_priority_btn = e.currentTarget.innerHTML;
        }
      })
    })();


    const showPriorityonCreatedTodo = (() => {
      PubSub.subscribe("todo added",(msg,data) => {
        let title = data[2].getTitle();
        let priority = data[2].getPriority();
        let indicator = $(`.${title}-path`);

        if (priority == "High") {
          indicator.css('fill','red');
        }
        else if (priority == "Medium") {
          indicator.css('fill','green');
        }
        else {
          indicator.css('fill','yellow');
        }

      })
    })();


    return {};
} )()


export {Render};

const Render = ( () => {

    const closeTodoCard = () => {
      $(".Todo-card").removeClass("animate");
    }

    const closeProjectCard = () => {
      $(".new-project-card").removeClass("animate");
    }

    const viewTodoCard = (() => {
      $('.new-task-btn').click(() => {
        $(".Todo-card").addClass("animate");
        closeProjectCard();
      })
    })();


    const closeTodoCardOnCloseBtn = (() => {
      $('.close-todo-card').click(() => {
        $(".Todo-card").removeClass("animate");
      })
    })();


    const viewProjectCard = (() => {
      $('.new-project-btn').click(() => {
        $(".new-project-card").addClass("animate");
        closeTodoCard();
      })
    })();


    const closeProjectCardOnCloseBtn = (() => {
      $('.close-project-card').click(() => {
        $(".new-project-card").removeClass("animate");
      })
    })();

    const clearTodoCard = () => {
          $(".title").val("");
          $("textarea").val("");
        }

    const clearProjectCard = () => {
          $(".projecttitle").val("");
        }

    const viewProjects = (() => {

      PubSub.subscribe('add project',(msg,p_name)=>{
        $(".sidebar").append(`<div class="project ${p_name}"><p tabindex="0"
                                >${p_name}</p></div>`);
        PubSub.publish("project added");
        clearProjectCard();
        closeProjectCard();
      })

    })();


    const getNumberOfProjects = () => {
      return $(".sidebar").children().length;
    }


    const displayOrHideButtons = () => {
      if (getNumberOfProjects() == 0) {
        $(".new-task-btn").hide();
        $(".remove-project-btn").hide();
      }
      else {
        $(".new-task-btn").show();
        $(".remove-project-btn").show();
      }
    };

    const buttonsVisibility = (() => {
        displayOrHideButtons();
        PubSub.subscribe("add project", ()=> { displayOrHideButtons(); })
        PubSub.subscribe("project removed",()=> { displayOrHideButtons(); } )
    })();

    const showSelectedPriorityOnCreateTodoCard = (() => {
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


    const showPriorityofTodo = (priority) => {

      if (priority == "High") {
        $(`.${priority}:last`).css('fill','red');
      }
      else if (priority == "Medium") {
        $(`.${priority}:last`).css('fill','green');
      }
      else {
        $(`.${priority}:last`).css('fill','yellow');
      }

    }



    const appendNoteHtml = (title,description,priority) => {
      //priority circle and task completion tick
      $(".project-cards").append(`
        <div class="note note-${title}" >
          <div class="note-options">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path class="priority-circle ${priority}" class
                fill="#000000" d="M12,2A10,10 0 0,1 22,12A10,10
                 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
              </svg>
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path class="completion-tick ${title}"
                fill="#000000" d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,
                3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,
                19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,
                12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
              </svg>
            </div>
            <input type="text"  placeholder="Title" value=${title}>
            <textarea placeholder="Description">${description}</textarea>
        </div>
        `)
    }


    const viewTodos = (() => {

        const viewOnSidebar = (() => {
          PubSub.subscribe("add todo",(msg,data) => {
            let project_name = data[0] ,  todo_name = data[1].getTitle();
            $(`.${project_name}`).append(`<li class= "sidebar-note-${todo_name}">${todo_name}</li>`);
          })
        })();



        const viewOnProjectArea = (() => {

            const onProjectChange = (() => {
                PubSub.subscribe("current project", (msg, curr_project_obj) => {
                  $(".project-cards").empty();
                  let todos = curr_project_obj.getTodos() ;
                  for (let todo in todos){
                    let todoObj = todos[todo];
                    let title = todoObj.getTitle();
                    let description = todoObj.getDescription();
                    let priority = todoObj.getPriority();
                    appendNoteHtml(title,description,priority);
                    showPriorityofTodo(priority);
                    setTimeout( ()=> {
                      $(`.note-${title}`).addClass("animate");
                      PubSub.publish("project-changed"); },30 )

                  }

                })
            })();

            const onNewProject = (() => {
                PubSub.subscribe("add project", () => { $(".project-cards").empty(); })
            })()

            const onNewTodo = (() => {
                PubSub.subscribe("add todo",(msg,data)=> {
                  let todoObj = data[1];
                  let title = todoObj.getTitle();
                  let description = todoObj.getDescription();
                  let priority = todoObj.getPriority();
                  appendNoteHtml(title,description,priority);
                  showPriorityofTodo(priority);
                  clearTodoCard();
                  setTimeout( ()=> {
                    closeTodoCard();
                    $(".note:last").addClass("animate");
                    PubSub.publish("todo-added"); },30 )

                })
            })();

        })();
    })();

    const removeTodo = (() => {

        const fromProjectArea = (() => {
          PubSub.subscribe("remove todo DOM", (msg,todo_name) => {
            $(`.note-${todo_name}`).removeClass("animate");
            setTimeout( ()=> { $(`.note-${todo_name}`).remove(); },400 )
          })
        })();

        const fromSidebar = (() => {
          PubSub.subscribe("remove todo DOM",(msg,todo_name) => {
            $(`.sidebar-note-${todo_name}`).remove();
          })
        })();

    })();



    const removeProject = (() => {
      PubSub.subscribe("remove-project", (msg,data)=> {
        let proj_to_delete = data[0];
        let projects = data[1];
        $(`.sidebar .${proj_to_delete}`).remove();
        let remaining_projects = getNumberOfProjects();
        if (remaining_projects >0 ) {
          let new_current_project = $(".project:last").attr('class').split(" ")[1];
          let curr_proj_obj = projects[new_current_project];
          PubSub.publish("current project",curr_proj_obj);
        }
        else{
          $(".project-cards").empty();
        }
        PubSub.publish("project removed");
      })

    })();


    return {};
} )()


export {Render};

const Render = ( () => {

    const viewTodoCard = () => {
      $(".Todo-card").css('display','grid');
    }

    const closeTodoCard = () => {
      $(".Todo-card").css('display','none');
    }

    return {viewTodoCard,closeTodoCard}
} )()


export {Render};

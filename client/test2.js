const tasks = [
    {
      _id: "620f39e1b109bd7aa0d1f80e",
      status: "pending",
      title: "Deep Cleaning",
      description: "Clean All Shelves in Antiques Section",
      dueDate: "1408410714000",
      user: {
        _id: "620f39e0b109bd7aa0d1f7e2",
        firstName: "Alisha",
        lastName: "Alisha"
      }
    },
    {
      _id: "620f39e1b109bd7aa0d1f811",
      status: "pending",
      title: "Deep Cleaning",
      description: "Clean All Shelves in Diamond Section",
      dueDate: "1408410714000",
      user: {
        _id: "620f39e0b109bd7aa0d1f7e3",
        firstName: "Janki",
        lastName: "Patel"
      }
    },
    {
      _id: "620f39e1b109bd7aa0d1f814",
      status: "pending",
      title: "Deep Cleaning",
      description: "Clean All Shelves in Kiosk Section",
      dueDate: "1408410714000",
      user: {
        _id: "620f39e0b109bd7aa0d1f7e4",
        firstName: "Mina",
        lastName: "Chauhan"
      }
    },
    {
      _id: "620f39e1b109bd7aa0d1f817",
      status: "submitted",
      title: "Deep Cleaning",
      description: "Clean All Shelves in Gold Section",
      dueDate: "1408410714000",
      user: {
        _id: "620f39e0b109bd7aa0d1f7e7",
        firstName: "Sushma",
        lastName: "Patel"
      }
    },
    {
      _id: "620f39e1b109bd7aa0d1f81a",
      status: "pending",
      title: "Deep Cleaning",
      description: "Clean All Shelves in Diamond Kiosk Section",
      dueDate: "1408410714000",
      user: {
        _id: "620f39e0b109bd7aa0d1f7e7",
        firstName: "Sushma",
        lastName: "Patel"
      }
    }
  ]



  function filters(id, status){
      if(id && status){
        const resultbyuid = tasks.filter(task => task.user._id === id);
        const resultbystatus = resultbyuid.filter(task => task.status === status);
        return resultbystatus
      } else if (status) {
        const resultbystatus = tasks.filter(task => task.status === status);
        return resultbystatus
      } else if (id) {
        const resultbyuid = tasks.filter(task => task.user._id === id);
        return resultbyuid
      } else {
        return tasks
      }

  }
  //search by status is working
  //search by uid
  //serach by status & id

  console.log(filters('620f39e0b109bd7aa0d1f7e7', 'submitted'));


//   const resultbystatus = tasks.filter(task => task.status === 'pending');

//   const resultbyuid = tasks.filter(task => task.user._id === '620f39e0b109bd7aa0d1f7e7');

//   console.log(resultbyuid);


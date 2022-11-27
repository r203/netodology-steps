import { useState } from "react";
const Steps = () => {

  const [steps, setSteps] = useState([
    { date: '01.01.2021', distance: 1.2 },
    { date: '03.03.2023', distance: 5.2 },
    { date: '02.02.2022', distance: 3.8 },
    { date: '26.05.2021', distance: 1 },
    { date: '15.11.2022', distance: 12.1 },
  ])
  const [form, setForm] = useState({
    date: "",
    distance: 0,
  })

  const handleAddStep = (event) => {
    event.preventDefault();
    const newStep = { date: form.date, distance: form.distance };

    if (steps.find(el => el.date === newStep.date)) {
      const newPosts = steps.map((step) => (
        step.date === newStep.date
          ? { ...step, distance: +step.distance + +newStep.distance }
          : step
      ));
      setForm({ date: "", distance: 0 });
      return setSteps(newPosts);
    }

    setSteps(prevSteps => [...prevSteps, newStep]);
    setForm({ date: "", distance: 0 });
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleRemove = (step) => {
    setSteps(prevSteps => prevSteps.filter(o => o.date !== step.date))
  }

  const handleEdit = (step) => {
    setForm({ date: step.date, distance: step.distance });
    setSteps(prevSteps => prevSteps.filter(o => o.date !== step.date));
  }


  return (
    <>
      <form onSubmit={handleAddStep}>
        <input type="text" name="date" value={form.date} onChange={handleFormChange} />
        <input type="text" name="distance" value={form.distance} onChange={handleFormChange} />
        <button>добавить</button>
      </form>
      <ul>
        {steps
          .sort((a, b) => {
            let curr = a.date.split('.').reverse().join();
            let prev = b.date.split('.').reverse().join();
            return curr < prev ? -1 : (curr > prev ? 1 : 0);
          })
          .map(step => {
            return (
              <li key={step.date.toString()}>
                <div>{step.date}</div>
                <div>{step.distance}</div>
                <div>
                  <button onClick={() => handleEdit(step)}>редактировать</button>
                  <button onClick={() => handleRemove(step)}>X</button>
                </div>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default Steps;
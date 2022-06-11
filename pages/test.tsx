const test = () => {

  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  // const hours = ('0' + t.getHours()).slice(-2);
  // const minutes = ('0' + t.getMinutes()).slice(-2);
  // const seconds = ('0' + t.getSeconds()).slice(-2);
  const fullDate = `${year}-${month}-${date}`;

  // console.log(fullDate, `+`, t, `+`, date, `+`, month)

  const activities = [
    { title: 'Shopping', date: '2019-02-28' },
    { title: 'Shopping', date: '2019-06-10' },
    { title: 'Trekking', date: '2019-06-15' },
    { title: 'Trekking', date: '2019-08-25' },
    { title: 'Trekking', date: '2019-09-30' },
    { title: 'Trekking', date: '2019-03-15' },
    { title: 'Trekking', date: '2019-04-15' },
    { title: 'Trekking', date: '2019-12-15' }
  ]

  const sortedActivities = activities.slice().sort((a, b) => {
    
    const AA = new Date(a.date).getTime()
    const BB = new Date(b.date).getTime()
    
    return BB - AA
  })

  const filter = sortedActivities.filter((activity: any) => {
    const activityDateStr = activity.date.slice(5).replace(/-/g, '')
    const todayDateStr = fullDate.slice(5).replace(/-/g, '')
    const activityDateNum = Number(activityDateStr)
    const todayDateNum = Number(todayDateStr)
    if (activityDateNum > todayDateNum)
    return activity
  })
  console.log(filter)
  
  console.log(sortedActivities)

  return (
    <div>test</div>
  )
}

export default test
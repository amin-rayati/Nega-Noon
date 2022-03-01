import React, { useState } from 'react'
import DatePicker from 'react-datepicker2'

const MyDatePicker = () => {
  return (
    <div>
      <DatePicker
        timePicker={false}
        isGregorian={false}
        className='form-input2'
      />
    </div>
  )
}

export default MyDatePicker

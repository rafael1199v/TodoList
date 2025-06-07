import React from 'react'

function Alert({ title, message, type }) {

  const alertStyles = {
    info: 'text-blue-800 bg-blue-50 dark:text-blue-400',
    danger: 'text-red-800 bg-red-50 dark:text-red-400',
    success: 'text-green-800 bg-green-50 dark:text-green-400',
    warning: 'text-yellow-800 bg-yellow-50 dark:text-yellow-400',
    dark: 'text-gray-800 bg-gray-50 dark:text-gray-400'
  }

  return (
    <div className={`p-4 mb-4 text-sm rounded-lg dark:bg-gray-80 ${alertStyles[type]}`} role="alert">
        <span className="font-medium">{ title }</span> { message }
    </div>
  )
}

export default Alert
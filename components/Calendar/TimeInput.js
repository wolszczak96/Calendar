// @flow

import React from 'react'

const validate = (onChange: Function, onBlur?: Function) => ev => {
  onChangeControl(ev)
  const digits = ev.target.value.replace(':', '').split('')
  while (digits.length < 4) digits.push('0')
  ev.target.value = [
    digits.slice(0, 2).join(''),
    digits.slice(2, 4).join(''),
  ].join(':')
  onChange(ev)
  if (onBlur) onBlur(ev)
}

const cache = {
  prev: '',
}

const onChangeControl = ev => {
  if (
    /\d\d:/.test(cache.prev) &&
    ev.target.value === (cache.prev || '').substr(0, 2)
  )
    return
  const v = ev.target.value.replace(/[^0-9:]/g, '').split(':')
  let val = '',
    substr = ''
  switch (v.length) {
    case 0:
      ev.target.value = ''
      break
    default:
      substr = v[0].substr(0, 2)
      val = parseInt(substr, 10)
      if (Number.isNaN(val)) {
        ev.target.value = ''
        break
      }
      ev.target.value =
        substr === '00'
          ? '00:'
          : val > 2 && val < 10
            ? `0${val}:`
            : val > 23 ? '23:' : `${val}${val > 9 ? ':' : ''}`
      substr = (v[1] || '').substr(0, 2)
      val = parseInt(substr, 10)
      if (Number.isNaN(val)) break
      ev.target.value += substr === '00' ? '00' : val > 59 ? '59' : val
  }
  cache.prev = ev.target.value
}

export default ({ value, onChange, onBlur }: Object) => {
  cache.prev = value
  return (
    <div className="flex-cont">
      <input
        type="text"
        defaultValue={value}
        onChange={onChangeControl}
        onBlur={validate(onChange, onBlur)}
      />
      <style jsx>{`
        .flex-cont {
          display: flex;
        }
        input {
          font-size: 16px;
          cursor: text;
          background: none;
          border: none;
          outline: none;
          width: 60px;
        }
      `}</style>
    </div>
  )
}

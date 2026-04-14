'use client'

import React from 'react'

export default function Icon() {
  return React.createElement('img', {
    src: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" rx="4" fill="#ac8256"/><circle cx="12" cy="13" r="2" fill="#fff"/></svg>`),
    alt: '',
    width: 20,
    height: 20,
    style: { display: 'inline-block', verticalAlign: 'middle' },
  })
}

import React from 'react'

export const Logo = (props: any) => {
    const { renderDefault, title } = props
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/static/logo.png" alt="Doctor Ramdoun Logo" style={{ height: '24px', width: 'auto' }} />
            {renderDefault(props)}
        </div>
    )
}

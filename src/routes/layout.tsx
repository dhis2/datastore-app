import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                width: '100%',
            }}
        >
            <div
                id="sidebar"
                style={{
                    width: '20%',
                    border: '1px groove white',
                }}
            >
                <nav>
                    <ul>
                        <li>
                            <Link to={`/dataStore`}>DataStore</Link>
                        </li>
                        <li>
                            <Link to={`/userDataStore`}>User DataStore</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div
                id="main"
                style={{
                    width: '80%',
                    paddingLeft: '1em',
                }}
            >
                <Outlet />
            </div>
        </div>
    )
}

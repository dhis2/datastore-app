import PropTypes from 'prop-types'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'
import CenteredLoader from '../Loader'
import SidebarNavLink from '../sidebar/SidebarNavLink'

function LinksList({ data, error, loading, store }) {
    return (
        <div className={classes.sidebarList}>
            {error && <span>{i18n.t('ERROR')}</span>}
            {loading && <CenteredLoader />}
            {data && (
                <>
                    <h4 className={classes.bottom}>{i18n.t('Namespaces')}</h4>
                    <ul>
                        {data.results.map((namespace: string, index) => {
                            return (
                                <SidebarNavLink
                                    key={`${index}-${namespace}`}
                                    to={`/${store}/${namespace}`}
                                    label={namespace}
                                />
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}

LinksList.propTypes = {
    data: PropTypes.object,
    error: PropTypes.any,
    loading: PropTypes.any,
    store: PropTypes.string,
}

export default LinksList

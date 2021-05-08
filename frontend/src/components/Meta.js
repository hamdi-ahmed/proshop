import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To ProShop',
    keyword: 'electronics, buy electronics, cheap electronics',
    description: 'We sell best product'
}

export default Meta

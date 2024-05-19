'use client'
import MoonLoader from 'react-spinners/MoonLoader'

const override = {
    display: 'block',
    margin: '100px auto',
}

const LoadingPage = ({ loading }) => {
    return (
        <MoonLoader
            color="#3b82f6"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
        />
    )
}
export default LoadingPage

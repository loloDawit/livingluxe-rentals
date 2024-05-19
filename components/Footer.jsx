const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-200 py-4 fixed bottom-0 left-0 w-full">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <div>
                    <p className="text-sm text-gray-500 mt-2 md:mt-0">
                        &copy; {currentYear} MiniAirbnb. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

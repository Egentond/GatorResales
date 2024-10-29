import { Link } from 'react-router-dom'

const Menu = () => {
    return(
        <>
            <div className='bg-gatorsBlue text-white space justify-between flex flex-wrap align-middle items-center py-5 '>
                <h1 className='text-3xl ml-4'>Gator Resales</h1>
                <nav>
                    <ul className='text-xl flex flex-wrap space-x-10 mx-4'>
                        <li className='rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3'>
                            <Link>Buy</Link>
                        </li>
                        <li className='rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3'>
                            <Link to='/list-ticket'>Sell</Link>
                        </li>
                        <li className='rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3'>
                            <Link>Sign in</Link>
                        </li>
                        <li className='rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3'>
                            <Link>Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Menu;
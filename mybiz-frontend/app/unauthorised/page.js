'use client'
import Link from 'next/link';

const unauthorisedPage = () => {

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-gray-950">Unauthorised</h1>
            <p className="text-gray-600">You are not authorised to view this page.</p>

            <Link href='/'>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Go back to home</button>
            </Link>
        </div>
    );
}

export default unauthorisedPage;
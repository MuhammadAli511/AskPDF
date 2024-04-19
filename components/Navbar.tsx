'use client';
import Link from 'next/link';

const Navbar = () => {

    return (
        <Link href={`/`}>
            <nav className="flex items-center justify-between flex-wrap bg-[#f8f5ee] p-6 border-b-2 font-bold text-xl">
                Professor.ai
            </nav>
        </Link>
    );

}

export default Navbar;
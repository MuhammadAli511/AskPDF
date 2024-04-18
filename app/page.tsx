'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUploadClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen mx-72 mt-10">
            <h1 className="text-3xl font-bold mb-8">Documents</h1>
            <div className="flex flex-col items-center justify-center mt-40">
                <Image src="/pdf.svg" alt="PDF icon" width={40} height={40} />
                <p className="text-gray-800 mt-4 font-bold">No PDF documents</p>
                <p className="text-gray-800 mb-8">Get started by uploading a new document.</p>
                <button
                    onClick={handleUploadClick}
                    className="px-6 py-2 bg-[#ff612f] text-white rounded shadow-lg hover:bg-[#d45b36] focus:outline-none"
                >
                    Upload
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <Image src="/pdf.svg" alt="PDF icon" width={24} height={24} />
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Upload PDF Document</h3>
                            <div className="mt-2 px-7 py-3">
                                <input type="file" accept=".pdf" className="w-full text-sm text-gray-500 cursor-pointer
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                                />
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    id="ok-btn"
                                    className="px-4 py-2 bg-[#ff612f] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#d45b36]"
                                >
                                    Upload
                                </button>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-[#f8f5ee] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[#e4e3e2]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

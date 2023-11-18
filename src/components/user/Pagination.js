// Pagination.js
import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='flex justify-center space-x-2'>
        {pageNumbers.map(number => (
          <li key={number} className='cursor-pointer'>
            <a onClick={() => paginate(number)} className='text-blue-600 hover:underline'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

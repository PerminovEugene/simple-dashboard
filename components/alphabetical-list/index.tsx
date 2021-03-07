import React, { FunctionComponent, useState } from 'react';

type Item = {
    firstName: string;
    middleName?: string;
    lastName: string;
    id: number;
    showNotification: boolean;
    group: string;
}

/**
 * 
 * @param param0 
 */
const AlphabeticalList:FunctionComponent<{ items: Item[] }> = ({ items = [] }) => {
  return <ul>
    {items.map((item) => (
        <li>{item.firstName}</li>        
    ))}
  </ul>
}
export default AlphabeticalList;
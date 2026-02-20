import React, { useState, useEffect } from 'react';
import { callMsGraph, callMsGraphUsers, callPeopleNameAndEmail } from '../graph.ts';
import type { JSXElement } from "@fluentui/react-components";
import { TokenProvider } from '../TokenProvider.js';

import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  useTagPickerFilter,
} from "@fluentui/react-components";
import { Tag, Avatar, Field } from "@fluentui/react-components";

//https://graph.microsoft.com/v1.0/users?$filter=endsWith(displayName,'Han')&$orderBy=displayName&$select=id,displayName,mail
//https://graph.microsoft.com/v1.0/users?$filter=startsWith(displayName,'I')&$select=id,displayName,mail

export const GraphPicker = (): JSXElement => {
 const [query, setQuery] = useState<string>(""); //initial state for the query
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);//initial state for the slected options - array of strings
 const [loading, setLoading] = useState<boolean>(false);
  const { token, loading: tokenLoading, error: tokenError } = TokenProvider();

  //Experimental - dynamic options from graph - needs work -----------------
  const [options, setOptions] = useState<string[]>([]);

  //=----------------------------------------

//handles te graph call
 useEffect(() => {
    if (query.length < 2 || !token) {
      setOptions([]); // Clear options if query is too short
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await callPeopleNameAndEmail(token, query); //change to right call
        // Assuming callMsGraphUsers returns an array of user display names
        setOptions(users.value.map((user: any) => user.displayName));
      } catch (error) {
        console.error("Error fetching users:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]); //Why this array here : NVM IT RUNS BASED ON THIS DEPENDENCY ARRAY

const onOptionSelect: TagPickerProps["onOptionSelect"] = (e, data) => { //ON SELECT, not on type
    if (data.value === "no-matches") {
      return; //what is data? 
    }

    setSelectedOptions(data.selectedOptions); //sets the selection Options with data - crates a new array and appends the value
    setQuery("");
  };

  const children = useTagPickerFilter({
    query,
    options,
    noOptionsElement: (
      <TagPickerOption value="no-matches">
        We couldn't find any matches
      </TagPickerOption> //nooptions setting, seems they are set in the constructor of the useTagPickerFilter
    ),
    renderOption: (option) => (
      <TagPickerOption
        secondaryContent="Microsoft FTE" //What displays below
        key={option}
        media={
          <Avatar shape="square" aria-hidden name={option} color="colorful" />
        }
        value={option} //Actual response
      >
        {option}
      </TagPickerOption> //^ displays the option with the avatar and secondary content
    ),

    filter: (option) =>
      !selectedOptions.includes(option) &&
      option.toLowerCase().includes(query.toLowerCase()), //this is the actual filtering based of query (search text sts)
  });

if (tokenLoading) return <div>Loading...</div>;
  if (tokenError) return <div>Error: {tokenError}</div>; //Loading states 

 return(

 <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedOptions}
      >
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map((option) => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            aria-label="Select Employees"
            value={query}
           // onChange={(e) => setQuery(e.target.value)} //this onChange in the query, call graph

           onChange = {(e) => setQuery(e.target.value)} //set teh query to the typed value
           //UseEffect gets called when the  condition is reached?
          />
        </TagPickerControl>

        <TagPickerList>{children}</TagPickerList>
      </TagPicker>
    </Field>

 );
};
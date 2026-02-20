import React, { useState } from 'react';
import { callMsGraph, callMsGraphUsers } from '../graph.ts';
import type { JSXElement } from "@fluentui/react-components";

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
 const [query, setQuery] = React.useState<string>(""); //initial state for the query
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);//initial state for the slected options - array of strings

  //Experimental - dynamic options from graph - needs work -----------------
  const [options, setOptions] = React.useState<string[]>([]);

  //=----------------------------------------

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
            onChange={(e) => setQuery(e.target.value)} //this onChange in the query, call graph
          />
        </TagPickerControl>

        <TagPickerList>{children}</TagPickerList>
      </TagPicker>
    </Field>

 );
};
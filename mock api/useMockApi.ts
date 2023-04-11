import React, { useState, useEffect, useCallback } from 'react';
import { dummyApi } from '../api/mock';
import { Person } from '../api/mock';

export const useMockApi = (dependencies: [] | unknown[]) => {
  const [state, setState] = useState<Person[] | []>([]);
  const [refetch, setRefetch] = useState(true);
  const [error, setError] = useState(false);

  const getData = useCallback(() => {
    setError(false);
    setRefetch(false);
    dummyApi
      .mockResponse()
      .then((value) => {
        setState(value.data);
      })
      .catch(setError);
  }, [dependencies]);

  const addData = useCallback(
    (id: number, name: string, age: number) => {
      setError(false);
      setRefetch(false);
      dummyApi
        .mockAddNewPerson(id, name, age)
        .then((value) => {
          setRefetch(true);
        })
        .catch(setError);
    },
    [dependencies]
  );

  const changeData = useCallback(
    (id: number, name: string, age: number) => {
      setError(false);
      setRefetch(false);
      dummyApi
        .mockEditPerson(id, name, age)
        .then((value) => {
          setRefetch(true);
        })
        .catch(setError);
    },
    [dependencies]
  );

  const deleteData = useCallback(
    (id: number) => {
      setError(false);
      setRefetch(false);
      dummyApi
        .mockDeletePerson(id)
        .then((value) => {
          setRefetch(true);
        })
        .catch(setError);
    },
    [dependencies]
  );

  useEffect(() => {
    if (!refetch) {
      return;
    }
    getData();
    setRefetch(false);
  }, [refetch]);

  return { state, getData, addData, changeData, deleteData };
};

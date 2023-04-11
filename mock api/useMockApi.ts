import React, { useState, useEffect, useCallback } from 'react';
import { dummyApi } from '../api/mock';
import { Person } from '../api/mock';

export const useMockApi = (dependencies: [] | unknown[]) => {
  const [state, setState] = useState<Person[] | []>([]);
  const [refetch, setRefetch] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setError(false);
    setLoading(true);
    setRefetch(false);
    dummyApi
      .mockResponse()
      .then((value) => {
        setState(value.data);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [dependencies]);

  const addData = useCallback(
    (id: number, name: string, age: number) => {
      setError(false);
      setLoading(true);
      setRefetch(false);
      dummyApi
        .mockAddNewPerson(id, name, age)
        .then((value) => {
          setRefetch(true);
        })
        .catch(setError)
        .finally(() => {
          setLoading(false);
        });
    },
    [dependencies]
  );

  const changeData = useCallback(
    (id: number, name: string, age: number) => {
      setError(false);
      setLoading(true);
      setRefetch(false);
      dummyApi
        .mockEditPerson(id, name, age)
        .then((value) => {
          setRefetch(true);
        })
        .catch(setError)
        .finally(() => {
          setLoading(false);
        });
    },
    [dependencies]
  );

  const deleteData = useCallback(
    (id: number) => {
      setError(false);
      setLoading(true);
      setRefetch(false);
      dummyApi
        .mockDeletePerson(id)
        .then((value) => {
          setRefetch(true);
        })
        .catch(setError)
        .finally(() => {
          setLoading(false);
        });
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

  return { state, error, loading, getData, addData, changeData, deleteData };
};

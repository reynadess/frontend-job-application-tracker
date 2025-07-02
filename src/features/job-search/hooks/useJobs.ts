import { useCallback } from "react";
import { useJobStore } from "../store/job.store";
import { Job } from "../types/job.types";

export const useJobs = () => {
    // Get state values directly
    const jobs = useJobStore((state) => state.jobs);
    const loading = useJobStore((state) => state.loading);
    const error = useJobStore((state) => state.error);
    
    // Get actions directly from store selectors
    const storeAddJob = useJobStore((state) => state.addJob);
    const storeUpdateJob = useJobStore((state) => state.updateJob);
    const storeDeleteJob = useJobStore((state) => state.deleteJob);
    const storeGetJobList = useJobStore((state) => state.getJobList);
    const storeGetJobById = useJobStore((state) => state.getJobById);
    const storeGetJobByIds = useJobStore((state) => state.getJobByIds);
    
 

    // Wrap functions with useCallback to prevent unnecessary re-renders
    const addJob = useCallback(async (job: Job) => {
        await storeAddJob(job);
    }, [storeAddJob]);

    const updateJob = useCallback(async (jobId: number, job: Job) => {
        await storeUpdateJob(jobId, job);
    }, [storeUpdateJob]);

    const deleteJob = useCallback(async (jobId: number) => {
        await storeDeleteJob(jobId);
    }, [storeDeleteJob]);

    const getJobList = useCallback(async () => {
        await storeGetJobList();
    }, [storeGetJobList]);

    const getJobById = useCallback(async (id: number) => {
        await storeGetJobById(id);
    }, [storeGetJobById]);

    const getJobByIds = useCallback(async (ids: number[]) => {
        await storeGetJobByIds(ids);
    }, [storeGetJobByIds]);

    return {
        // state
        jobs,
        loading,
        error,

        // actions
        addJob,
        updateJob,
        deleteJob,
        getJobList,
        getJobById,
        getJobByIds
    };
};
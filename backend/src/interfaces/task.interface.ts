import { ETaskStatus } from '../enums/task-status.enum';

export interface ITask {
	id: number;
	title: string;
	description?: string;
	status: ETaskStatus;
	userId: number;
}

export type ICreateTaskDto = Omit<ITask, 'id' | 'userId'>;

export type IUpdateTaskDto = Partial<Omit<ITask, 'id' | 'userId'>>;

export type ITaskResponseDto = Pick<
	ITask,
	'id' | 'title' | 'description' | 'status'
>;

export type ITaskListQuery = {
	page: number;
	limit: number;
	status?: ETaskStatus;
};

export type ITaskList = {
	tasks: ITask[];
	total: number;
	page: number;
	limit: number;
};

export type ITaskListResponseDto = {
	tasks: ITaskResponseDto[];
	total: number;
	page: number;
	limit: number;
};

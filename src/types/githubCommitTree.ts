export interface CommitTrees {
	sha: string;
	url: string;
	tree: Tree[];
	truncated: boolean;
}

export interface Tree {
	path: string;
	mode: string;
	type: 'blob' | 'tree';
	sha: string;
	size?: number;
	url: string;
}

from collections import deque

def bfs(grid, startnodes):
    """
    Multisource BFS on a grid.
    
    Parameters:
    grid (list of list of int): 2D grid where BFS is performed.
    startnodes (list of list of int): List of [x, y] positions from where BFS will start.
    
    Returns:
    visited_order (list of list of int): List of visited nodes in BFS order.
    """
    # Grid dimensions
    m, n = len(grid), len(grid[0])
    
    # Initialize visited
    visited = [[0] * n for _ in range(m)]
    
    # List to store BFS traversal order
    visited_order = []
    
    # Queue for BFS
    q = deque()
    
    # Add all start nodes to the queue
    for node in startnodes:
        x, y = node
        q.append([x, y])
        
    # Directions for all 8 neighbors (up, down, left, right, and diagonals)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    # Perform BFS
    while q:
        pos = q.popleft()
        i, j = pos[0], pos[1]
        if(visited[i][j]):
            continue
        
        visited[i][j] = 1  
        # Append current node to the visited order list
        visited_order.append([i, j])
        
        for d in directions:
            new_i, new_j = i + d[0], j + d[1]
            
            # Check boundaries and whether the new cell is visited
            if 0 <= new_i < m and 0 <= new_j < n and not visited[new_i][new_j]:
                q.append([new_i, new_j])
    
    return visited_order


def dfs(grid, startnodes):   # for DFS, the only effective starting node is the one you pop at the beginning of the iteration. cannot do simultaneous traversal with this.
    m,n = len(grid), len(grid[0])
    
    visited = [[0]*n for _ in range(m)]
    
    visited_order = []
    
    # Directions for all 8 neighbors (up,right,down,left and diagonals)
    directions = [(-1,0),(0,1),(1,0),(0,-1)]
    
    s= Stack()
    
    for node in startnodes:
        s.push(node)
    
    while not s.is_empty():
        pos = s.peek()
        s.pop()
        x,y = pos
        if(visited[x][y]) :
            continue
        visited[x][y] = 1
        visited_order.append(pos)
        
        for d in directions:
            new_i, new_j = x + d[0], y + d[1]
            
            # Check boundaries and whether the new cell is visited
            if 0 <= new_i < m and 0 <= new_j < n and not visited[new_i][new_j]:
                s.push([new_i, new_j])
    
    
    return visited_order


def floodfill(grid,startnodes):
        # Grid dimensions
    m, n = len(grid), len(grid[0])
    
    # Initialize visited
    visited = [[0] * n for _ in range(m)]
    
    # List to store BFS traversal order
    visited_order = []
    
    # Queue for BFS
    q = deque()
    
    # Add all start nodes to the queue
    for node in startnodes:
        x, y = node
        q.append([x, y])
        
    # Directions for all 8 neighbors (up, down, left, right, and diagonals)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    # Perform BFS
    while q:
        pos = q.popleft()
        i, j = pos[0], pos[1]
        if(visited[i][j]):
            continue
        
        visited[i][j] = 1  
        # Append current node to the visited order list
        visited_order.append([i, j])
        
        for d in directions:
            new_i, new_j = i + d[0], j + d[1]
            
            # Check boundaries and whether the new cell is visited
            if 0 <= new_i < m and 0 <= new_j < n and not visited[new_i][new_j] and grid[new_i][new_j]!=1:
                q.append([new_i, new_j])
    
    return visited_order


class Stack:
    def __init__(self):
        self.stack = []

    # Push an element onto the stack
    def push(self, item):
        self.stack.append(item)
        print(f'Pushed {item} onto the stack')

    # Pop an element from the stack
    def pop(self):
        if not self.is_empty():
            item = self.stack.pop()
            print(f'Popped {item} from the stack')
            return item
        else:
            print('Stack is empty!')
            return None

    # Peek at the top element without popping
    def peek(self):
        if not self.is_empty():
            return self.stack[-1]
        else:
            print('Stack is empty!')
            return None

    # Check if the stack is empty
    def is_empty(self):
        return len(self.stack) == 0

    # Get the size of the stack
    def size(self):
        return len(self.stack)



from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import traversal_algos
import os

app = Flask(__name__)
CORS(app)  # CORS is needed for cross origin. (different ports)

# Example route handler in Flask
@app.route('/visualize', methods=['POST'])
def visualize_algorithm():
    data = request.get_json()

    algorithm = data['algorithm']
    grid = data['grid']
    startNodes = data['startList']
    # nrows = data['nrows']
    # ncols = data['ncols']
    # nstarts = len(startNodes)

    if algorithm == 'Breadth-first-search':
        
        bfs_result = traversal_algos.bfs(grid,startNodes)
        # Return the result as JSON
        return jsonify({'Order': bfs_result})
    
    
    elif algorithm == 'Depth-first-search':
        
        dfs_result = traversal_algos.dfs(grid,startNodes)

        # Return the result as JSON
        return jsonify({'Order': dfs_result})
    
    elif algorithm == 'Flood Fill':
        
        result = traversal_algos.floodfill(grid,startNodes)
        
        return jsonify({'Order':result})

    return jsonify({'error': 'Please select an algorithm'}), 400

if __name__ == '__main__':
    app.run(debug=True,host = 0.0.0.0 ,port = int(os.environ.get('PORT', 5000)))



import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Save, 
  FolderTree, 
  FileCode, 
  Settings, 
  Activity, 
  Cpu, 
  Layout, 
  TerminalSquare, 
  Lightbulb,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// --- Mock Data ---
const initialCode = `import pypto.frontend as pypto

@pypto.jit
def flash_attention_block(Q, K, V):
    # User Logic for Attention
    pypto.set_vec_tile_shapes([128, 64])
    pypto.set_cube_tile_shapes([64, 64, 64])
    
    # MatMul 1: Q * K^T
    score = pypto.matmul(Q, K.transpose())
    
    # Softmax
    probs = pypto.softmax(score)
    
    # MatMul 2: probs * V
    out = pypto.matmul(probs, V)
    
    return out
`;

const mockGraphNodes = [
  { id: 'n1', type: 'Input', label: 'Input Data', x: 50, y: 100, status: 'success' },
  { id: 'n2', type: 'Tile', label: 'Tile_Q_K', x: 200, y: 50, line: 9, status: 'success' },
  { id: 'n3', type: 'Block', label: 'Cube_MatMul_1', x: 350, y: 50, line: 9, params: { scopeId: 101, l1Reuse: false, nBuffer: 2 }, status: 'warning' },
  { id: 'n4', type: 'Block', label: 'Vec_Softmax', x: 500, y: 100, line: 12, params: { scopeId: 102, l1Reuse: true, nBuffer: 1 }, status: 'success' },
  { id: 'n5', type: 'Block', label: 'Cube_MatMul_2', x: 650, y: 150, line: 15, params: { scopeId: 103, l1Reuse: false, nBuffer: 4 }, status: 'success' },
  { id: 'n6', type: 'Output', label: 'Output', x: 800, y: 100, status: 'success' },
];

const mockGraphEdges = [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n6' },
  { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' }
];

function App() {
  // --- State ---
  const [code, setCode] = useState(initialCode);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStatus, setCompileStatus] = useState('idle'); // idle, success, error
  const [activeBottomTab, setActiveBottomTab] = useState('console'); // console, profiler
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [logs, setLogs] = useState(['[System] IDE 初始化完成。等待算子编译...']);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  // --- Handlers ---
  const handleCompile = () => {
    setIsCompiling(true);
    setCompileStatus('idle');
    setLogs(prev => [...prev, '> 启动背景增量编译...', '> 正在分析 Tile Graph...', '> 正在生成 Block Graph (LEAF/ROOT)...']);
    
    setTimeout(() => {
      setIsCompiling(false);
      setCompileStatus('success');
      setLogs(prev => [...prev, '[Success] 编译成功。耗时 1.2s。', '[Info] 检测到未优化的 Block 边界，建议查看 Profiling 数据。']);
      setActiveBottomTab('profiler');
      setShowAiSuggestion(true);
    }, 1500);
  };

  const handleNodeClick = (id) => {
    setSelectedNodeId(id);
    const node = mockGraphNodes.find(n => n.id === id);
    if (node && node.line) {
       // Simulate code highlight jumping (In a real app, this would control the editor selection)
       setLogs(prev => [...prev, `[Action] 选中图节点 ${node.label}，映射到源码第 ${node.line} 行。`]);
    }
  };

  const selectedNode = mockGraphNodes.find(n => n.id === selectedNodeId);

  // --- Sub-components ---
  const TopNavBar = () => (
    <div className="flex items-center justify-between bg-slate-900 border-b border-slate-700 px-4 py-2 text-sm text-slate-300">
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-blue-400 font-bold text-lg tracking-wider">
          <Cpu className="w-5 h-5 mr-2" /> PyPTO IDE
        </div>
        <div className="flex space-x-4 cursor-pointer">
          <span className="hover:text-white transition">文件 (File)</span>
          <span className="hover:text-white transition">编辑 (Edit)</span>
          <span className="hover:text-white transition">视图 (View)</span>
          <span className="hover:text-white transition">帮助 (Help)</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleCompile}
          disabled={isCompiling}
          className={`flex items-center px-3 py-1.5 rounded text-white font-medium transition ${isCompiling ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
        >
          {isCompiling ? <Activity className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
          {isCompiling ? '增量编译中...' : '编译算子 (Compile)'}
        </button>
      </div>
    </div>
  );

  const FileExplorer = () => (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="px-4 py-2 border-b border-slate-700 font-semibold text-slate-300 text-xs tracking-wider uppercase flex items-center">
        <FolderTree className="w-4 h-4 mr-2" /> 资源管理器
      </div>
      <div className="p-2 text-sm text-slate-400">
        <div className="flex items-center py-1 cursor-pointer hover:bg-slate-700 rounded px-2">
          <ChevronDown className="w-4 h-4 mr-1" /> src/
        </div>
        <div className="flex items-center py-1 cursor-pointer bg-blue-900/30 text-blue-300 rounded px-2 ml-4">
          <FileCode className="w-4 h-4 mr-2 text-blue-400" /> flash_attn.py
        </div>
        <div className="flex items-center py-1 cursor-pointer hover:bg-slate-700 rounded px-2 mt-2">
          <ChevronRight className="w-4 h-4 mr-1" /> graph_ir/
        </div>
        <div className="flex items-center py-1 cursor-pointer hover:bg-slate-700 rounded px-2">
          <ChevronRight className="w-4 h-4 mr-1" /> build/
        </div>
      </div>
    </div>
  );

  const CodeEditor = () => (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] border-r border-slate-700 relative">
       <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-300 flex items-center">
         <FileCode className="w-4 h-4 mr-2 text-blue-400" /> flash_attn.py <span className="ml-2 w-2 h-2 rounded-full bg-slate-500"></span>
       </div>
       <div className="flex-1 overflow-auto flex">
          <div className="w-12 bg-[#1e1e1e] border-r border-slate-700 text-slate-500 text-right pr-2 py-4 font-mono text-sm select-none">
            {initialCode.split('\n').map((_, i) => <div key={i} className={selectedNode?.line === i + 1 ? "bg-blue-900/50 text-blue-300" : ""}>{i + 1}</div>)}
          </div>
          <textarea 
            className="flex-1 bg-transparent text-slate-300 p-4 font-mono text-sm resize-none outline-none leading-relaxed"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
       </div>
       {showAiSuggestion && (
         <div className="absolute top-12 right-4 bg-indigo-900/90 border border-indigo-500 p-3 rounded-lg shadow-lg text-sm max-w-sm animate-fade-in">
            <div className="flex items-start text-indigo-100">
              <Lightbulb className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-1">AI 调优建议</div>
                检测到 <span className="font-mono bg-indigo-950 px-1 rounded text-xs">Cube_MatMul_1</span> 存在 L1 缓存利用率低的问题。建议将 <span className="font-mono bg-indigo-950 px-1 rounded text-xs">cube_l1_reuse_setting</span> 设为 True。
                <button className="mt-2 text-xs bg-indigo-600 hover:bg-indigo-500 px-2 py-1 rounded w-full transition">
                  一键注入优化代码
                </button>
              </div>
            </div>
         </div>
       )}
    </div>
  );

  const BlockGraphView = () => (
    <div className="flex-1 bg-slate-900 flex flex-col relative overflow-hidden">
      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-300 flex justify-between items-center z-10">
        <div className="flex items-center"><Layout className="w-4 h-4 mr-2" /> Block Graph 视图 (LEAF)</div>
        <div className="flex space-x-2">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span> Tile/Block</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span> 待优化</span>
        </div>
      </div>
      
      {compileStatus === 'idle' && !isCompiling && (
        <div className="flex-1 flex items-center justify-center text-slate-500 flex-col">
          <Layout className="w-12 h-12 mb-4 opacity-20" />
          <p>点击「编译算子」生成计算图</p>
        </div>
      )}

      {isCompiling && (
        <div className="flex-1 flex items-center justify-center flex-col relative">
           <div className="w-64 h-64 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin absolute opacity-20"></div>
           <Activity className="w-8 h-8 text-blue-400 animate-pulse mb-4" />
           <p className="text-blue-400 font-mono text-sm">正在映射 Tile -{'>'} Block ...</p>
        </div>
      )}

      {compileStatus === 'success' && !isCompiling && (
        <div className="flex-1 relative overflow-auto p-8" style={{ minWidth: '800px' }}>
          {/* SVG Lines for Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
              </marker>
            </defs>
            {mockGraphNodes.map(node => {
               // Only draw simple forward edges for demo appearance
               const nextNode = mockGraphNodes.find(n => parseInt(n.id.replace('n','')) === parseInt(node.id.replace('n','')) + 1);
               if (nextNode) {
                 return (
                   <line key={`${node.id}-${nextNode.id}`}
                     x1={node.x + 60} y1={node.y + 20} 
                     x2={nextNode.x - 10} y2={nextNode.y + 20} 
                     stroke="#475569" strokeWidth="2" 
                     markerEnd="url(#arrowhead)" 
                   />
                 )
               }
               return null;
            })}
          </svg>

          {/* Render Nodes */}
          {mockGraphNodes.map((node) => (
            <div 
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className={`absolute cursor-pointer p-3 rounded-lg border-2 shadow-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center text-xs font-mono
                ${selectedNodeId === node.id ? 'ring-4 ring-blue-500/50 shadow-blue-900/50' : ''}
                ${node.type === 'Input' || node.type === 'Output' ? 'bg-slate-800 border-slate-600 text-slate-300 w-24 h-10' : ''}
                ${node.type === 'Tile' ? 'bg-indigo-900/80 border-indigo-500 text-indigo-200 w-32 h-12' : ''}
                ${node.type === 'Block' && node.status === 'success' ? 'bg-emerald-900/80 border-emerald-500 text-emerald-200 w-36 h-14' : ''}
                ${node.type === 'Block' && node.status === 'warning' ? 'bg-amber-900/80 border-amber-500 text-amber-200 w-36 h-14' : ''}
              `}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
            >
              <div className="font-bold truncate w-full text-center">{node.label}</div>
              {node.type === 'Block' && <div className="text-[10px] opacity-70 mt-1">{node.id}</div>}
              {node.status === 'warning' && <AlertCircle className="w-3 h-3 absolute -top-1 -right-1 text-amber-500 bg-slate-900 rounded-full" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const PropertiesPanel = () => (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col z-20">
      <div className="px-4 py-2 border-b border-slate-700 font-semibold text-slate-300 text-xs tracking-wider uppercase flex items-center">
        <Settings className="w-4 h-4 mr-2" /> 节点属性 (Properties)
      </div>
      <div className="p-4 flex-1 overflow-auto text-sm">
        {!selectedNode ? (
          <div className="text-slate-500 text-center mt-10">在图视图中选择节点以查看属性</div>
        ) : (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-700">
              <div className="text-lg font-bold text-white mb-1">{selectedNode.label}</div>
              <div className="text-xs text-slate-400">Type: <span className="text-blue-400">{selectedNode.type}</span></div>
            </div>

            {selectedNode.type === 'Block' && selectedNode.params && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Block 参数配置</div>
                
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded">
                  <span className="text-slate-300">Scope ID</span>
                  <span className="font-mono text-blue-300 bg-slate-900 px-2 py-0.5 rounded">{selectedNode.params.scopeId}</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-slate-300 text-xs flex justify-between">
                    <span>cube_l1_reuse_setting</span>
                    {selectedNode.status === 'warning' && <span className="text-amber-400 text-[10px]">建议开启</span>}
                  </label>
                  <select 
                    className="bg-slate-900 border border-slate-700 text-slate-200 rounded p-1.5 text-xs outline-none focus:border-blue-500"
                    defaultValue={selectedNode.params.l1Reuse ? "true" : "false"}
                  >
                    <option value="true">True (Enabled)</option>
                    <option value="false">False (Disabled)</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-slate-300 text-xs">vec_nbuffer_setting</label>
                  <input 
                    type="number" 
                    className="bg-slate-900 border border-slate-700 text-slate-200 rounded p-1.5 text-xs outline-none focus:border-blue-500"
                    defaultValue={selectedNode.params.nBuffer}
                    min="1" max="8"
                  />
                </div>

                <button className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white rounded py-2 text-xs transition flex items-center justify-center">
                  <Save className="w-3 h-3 mr-2" /> 应用并重新编译
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const BottomPanel = () => (
    <div className="h-64 bg-slate-900 border-t border-slate-700 flex flex-col flex-shrink-0">
      <div className="flex bg-slate-800 border-b border-slate-700">
        <button 
          className={`px-4 py-2 text-xs font-medium flex items-center border-b-2 transition-colors ${activeBottomTab === 'console' ? 'border-blue-500 text-blue-400 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          onClick={() => setActiveBottomTab('console')}
        >
          <TerminalSquare className="w-4 h-4 mr-2" /> 控制台 (Console)
        </button>
        <button 
          className={`px-4 py-2 text-xs font-medium flex items-center border-b-2 transition-colors ${activeBottomTab === 'profiler' ? 'border-blue-500 text-blue-400 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          onClick={() => setActiveBottomTab('profiler')}
        >
          <Activity className="w-4 h-4 mr-2" /> 性能分析 (Profiling)
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 relative">
        {activeBottomTab === 'console' ? (
          <div className="font-mono text-sm space-y-1">
            {logs.map((log, i) => (
              <div key={i} className={`${log.includes('Success') ? 'text-emerald-400' : log.includes('Error') ? 'text-red-400' : log.includes('Warning') || log.includes('Info') ? 'text-amber-400' : 'text-slate-300'}`}>
                {log}
              </div>
            ))}
          </div>
        ) : (
          compileStatus !== 'success' ? (
             <div className="h-full flex items-center justify-center text-slate-500 text-sm flex-col">
               <Activity className="w-8 h-8 mb-2 opacity-30" />
               运行 Profiling 并在上方完成编译以查看性能泳道图
             </div>
          ) : (
            // Mock Swimlane Chart
            <div className="w-full h-full flex flex-col">
              {/* Timeline Header */}
              <div className="flex text-[10px] text-slate-500 mb-2 border-b border-slate-700 pb-1">
                <div className="w-24">资源 \ 时间</div>
                <div className="flex-1 flex justify-between px-2">
                  <span>0us</span><span>10us</span><span>20us</span><span>30us</span><span>40us</span>
                </div>
              </div>
              
              {/* AI Core (Compute) */}
              <div className="flex items-center mb-4">
                <div className="w-24 text-xs text-slate-300 font-semibold">AI Core<br/><span className="text-[10px] text-slate-500">计算单元</span></div>
                <div className="flex-1 bg-slate-800 h-8 rounded relative border border-slate-700 overflow-hidden">
                  {/* Mock tasks */}
                  <div className="absolute top-1 bottom-1 left-[10%] w-[20%] bg-blue-600/80 rounded border border-blue-400 text-[10px] text-white px-1 overflow-hidden flex items-center hover:bg-blue-500 cursor-pointer" title="Cube_MatMul_1">Cube_MatMul_1</div>
                  <div className="absolute top-1 bottom-1 left-[35%] w-[15%] bg-emerald-600/80 rounded border border-emerald-400 text-[10px] text-white px-1 overflow-hidden flex items-center hover:bg-emerald-500 cursor-pointer" title="Vec_Softmax">Vec_Softmax</div>
                  <div className="absolute top-1 bottom-1 left-[60%] w-[30%] bg-blue-600/80 rounded border border-blue-400 text-[10px] text-white px-1 overflow-hidden flex items-center hover:bg-blue-500 cursor-pointer" title="Cube_MatMul_2">Cube_MatMul_2</div>
                  
                  {/* Highlight gap representing optimization opportunity */}
                  <div className="absolute top-0 bottom-0 left-[30%] w-[5%] bg-amber-500/20 animate-pulse border-x border-amber-500/50"></div>
                </div>
              </div>

              {/* DMA / Memory */}
              <div className="flex items-center">
                <div className="w-24 text-xs text-slate-300 font-semibold">AI CPU / DMA<br/><span className="text-[10px] text-slate-500">内存搬运</span></div>
                <div className="flex-1 bg-slate-800 h-8 rounded relative border border-slate-700 overflow-hidden">
                  <div className="absolute top-1 bottom-1 left-[5%] w-[5%] bg-purple-600/80 rounded border border-purple-400 text-[10px] text-white px-1 overflow-hidden flex items-center">Data In</div>
                  <div className="absolute top-1 bottom-1 left-[30%] w-[10%] bg-purple-600/80 rounded border border-purple-400 text-[10px] text-white px-1 overflow-hidden flex items-center shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10" title="搬运阻塞 (L1 未复用)">GM-{'>'}L1</div>
                  <div className="absolute top-1 bottom-1 left-[50%] w-[8%] bg-purple-600/80 rounded border border-purple-400 text-[10px] text-white px-1 overflow-hidden flex items-center">L1-{'>'}GM</div>
                  <div className="absolute top-1 bottom-1 left-[90%] w-[5%] bg-purple-600/80 rounded border border-purple-400 text-[10px] text-white px-1 overflow-hidden flex items-center">Data Out</div>
                </div>
              </div>

              <div className="mt-4 flex items-center text-xs text-amber-400 bg-amber-900/20 p-2 rounded border border-amber-900/50">
                <AlertCircle className="w-4 h-4 mr-2" /> 
                <span>性能瓶颈分析：发现在 10us-15us 之间存在算力空洞（AI Core 闲置）。下方 DMA 显示存在 GM 到 L1 的频繁搬运。<strong>建议：</strong>在 Cube_MatMul_1 节点开启 `cube_l1_reuse_setting`。</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col bg-slate-900 text-slate-200 font-sans overflow-hidden">
      <TopNavBar />
      
      <div className="flex-1 flex overflow-hidden">
        <FileExplorer />
        
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex overflow-hidden">
            <CodeEditor />
            <div className="flex-1 flex flex-col">
              <BlockGraphView />
            </div>
          </div>
          <BottomPanel />
        </div>
        
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;

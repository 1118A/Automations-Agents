import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  Mail, 
  Settings, 
  FileText, 
  Cpu, 
  Database, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  ArrowRight, 
  ChevronRight, 
  TrendingUp, 
  AlertCircle, 
  Copy, 
  Download, 
  Plus, 
  RefreshCw,
  Search,
  MessageSquare
} from 'lucide-react';

// Custom Notification Toast simulation helper
const useToast = () => {
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, showToast };
};

// Initial state data empty or ready for Google Sheet connection
const INITIAL_LEADS = [];

export default function App() {
  const { toast, showToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Custom new lead modal state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadTitle, setNewLeadTitle] = useState('');
  const [newLeadChannel, setNewLeadChannel] = useState('Email');
  const [newLeadHook, setNewLeadHook] = useState('');

  // Agent 5 Simulation response type selector
  const [simulateReplyType, setSimulateReplyType] = useState('Interested');
  const [simulatedReplyDraft, setSimulatedReplyDraft] = useState('');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNewLead = () => {
    if (!newLeadName || !newLeadCompany) {
      showToast('Please fill out Name and Company', 'error');
      return;
    }

    // Agent 1 Auto-Enrichment Simulation
    const simulatedPainPoint = `Struggling with disconnected tools and repetitive tracking between systems, highlighted by their recent update.`;
    const score = newLeadHook.length > 50 ? 'High' : 'Medium';
    
    const newL = {
      id: Date.now(),
      name: newLeadName,
      title: newLeadTitle || 'Founder / Business Owner',
      company: newLeadCompany,
      industry: 'Small Business / Agency',
      location: 'Global',
      channel: newLeadChannel,
      contactInfo: newLeadChannel === 'Email' ? `hello@${newLeadCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com` : `@${newLeadName.toLowerCase().replace(/\s/g, '')}`,
      priority: score,
      hook: newLeadHook || 'Growing team looking to optimize current workflows and scale operations.',
      painPoint: simulatedPainPoint,
      status: 'New',
      dateContacted: '',
      lastFollowUp: '',
      nextFollowUp: '',
      replyReceived: 'No',
      replyContent: '',
      notes: 'Simulated and enriched by Lead Researcher Agent 1.'
    };

    setLeads([newL, ...leads]);
    setSelectedLead(newL);
    
    // reset form
    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadTitle('');
    setNewLeadHook('');
    
    showToast(`Lead created! Agent 1 enriched details automatically.`, 'success');
  };

  const copyToClipboard = (text, message = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text);
    showToast(message);
  };

  // Generation Logic matching exact system instructions for Aakash
  const generateEmail = (lead) => {
    const firstName = lead.name.split(' ')[0];
    const subject = `Workflow automation for ${lead.company} (${lead.priority === 'High' ? 'Save 15+ Hours/Week' : 'Process Optimization'})`;
    const body = `Hi ${firstName},\n\nI saw that you recently mentioned: "${lead.hook}" — that's a very common scaling hurdle.\n\nIt sounds like you're dealing with ${lead.painPoint.toLowerCase().replace(/.$/, '')}.\n\nI run an automation consultancy specializing in connecting tools like Notion, Shopify, Airtable, and custom APIs using n8n to eliminate these manual leaks.\n\nWe typically help operations teams save 10-30 hours per week by designing self-healing automations.\n\nWould you be open to a quick, low-pressure 15-minute audit where I can map out exactly how to automate this for you?\n\nBest,\nAakash Bambhaniya\nAutomation Consultant\naakash@bambhaniya.io | linkedin.com/in/aakashbambhaniya\n\nP.S. No pushy sales pitch, just a clear blueprint you can hand to your developer or build yourself.`;
    return { subject, body };
  };

  const generateLinkedIn = (lead) => {
    const firstName = lead.name.split(' ')[0];
    const connectionNote = `Hi ${firstName}, loved your post about ${lead.hook.substring(0, 100)}... resonates a lot! I design high-impact n8n & API automations to save teams 20+ hours a week. Would love to connect and share some insights.`.substring(0, 300);
    const firstDM = `Hi ${firstName}, thanks for connecting!\n\nI noticed you mentioned working to optimize ${lead.company}'s workflows. A quick tip: if you link Airtable to your notification hub, you can eliminate up to 85% of manual status updates.\n\nI actually drafted a custom quick-audit flow for operations. Would you like me to drop a 2-minute video overview here? No pitch, just raw value.`;
    const followUpDM = `Hey ${firstName}, quick bump here. I recently helped another business in the ${lead.industry} space automate their backend syncing, which cut processing delays in half.\n\nHappy to share the workflow diagram if you'd like to take a look? Let me know!`;
    return { connectionNote, firstDM, followUpDM };
  };

  const generateInstagram = (lead) => {
    const firstName = lead.name.split(' ')[0];
    const firstDM = `Hey ${firstName}! Just saw your update about ${lead.company} — that point about scaling was so spot on! 😄 I help agency owners and e-commerce founders automate all the tedious administrative work so they can scale stress-free.\n\nCurious — are you guys still doing your status tracking and spreadsheet syncs manually? Might have something useful to send your way!`;
    const followUpDM = `Hey ${firstName}, hope your week is going great! 🚀 Saw your recent post about the team expansion, huge congrats! If you guys need a hand automating onboarding workflows, let me know. Happy to share a quick checklist.`;
    return { firstDM, followUpDM };
  };

  const handleSimulateReply = (type) => {
    let reply = '';
    let responseText = '';
    const firstName = selectedLead.name.split(' ')[0];
    
    if (type === 'Interested') {
      reply = "Interested / Tell me more";
      responseText = `Hi ${firstName},\n\nThanks for reaching out! Glad to hear that.\n\nTo ensure we make the most of our time, could you share what tools you currently use and the size of your team?\n\nI have slots open this Thursday at 3 PM and Friday at 11 AM IST. Do either of those work for a quick 15-minute call?\n\nBest,\nAakash`;
    } else if (type === 'Not interested') {
      reply = "Not interested right now";
      responseText = `Thanks for letting me know, ${firstName}!\n\nCompletely understand. If you ever need to streamline workflows in the future, feel free to reach out.\n\nIn the meantime, feel free to grab our free Airtable & n8n scaling checklist here: bambhaniya.io/checklist\n\nCheers,\nAakash`;
    } else if (type === 'Pricing') {
      reply = "How much do you charge?";
      responseText = `Hi ${firstName},\n\nGreat question! Our pricing is entirely project-based and depends on the complexity of your custom workflows and the systems involved.\n\nTo give you an accurate range, let's jump on a quick 10-minute call to scope out your needs? I promise no high-pressure sales pitches.\n\nBest,\nAakash`;
    } else {
      reply = "Go away / Unsubscribe";
      responseText = `Understood, ${firstName}. I have noted this down and will not contact you again. Wish you the best!\n\nBest,\nAakash`;
    }

    setSimulatedReplyDraft(responseText);
    
    // Update state of selected lead
    const updatedLeads = leads.map(l => {
      if (l.id === selectedLead.id) {
        return {
          ...l,
          status: type === 'Interested' ? 'Interested' : type === 'Pricing' ? 'Replied' : 'Cold',
          replyReceived: 'Yes',
          replyContent: reply
        };
      }
      return l;
    });
    setLeads(updatedLeads);
    setSelectedLead({
      ...selectedLead,
      status: type === 'Interested' ? 'Interested' : type === 'Pricing' ? 'Replied' : 'Cold',
      replyReceived: 'Yes',
      replyContent: reply
    });
    showToast(`Agent 5 generated the perfect response for type: "${type}"!`, 'success');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge-new';
      case 'Contacted': return 'badge-contacted';
      case 'Replied': return 'badge-replied';
      case 'Interested': return 'badge-interested';
      case 'Call Booked': return 'badge-booked';
      case 'Cold': return 'badge-cold';
      case 'DNC': return 'badge-dnc';
      default: return 'badge-new';
    }
  };

  // n8n Workflow JSON Export
  const downloadN8NWorkflow = () => {
    const workflowJSON = {
      "meta": {
        "instanceId": "aakash_outreach_crm_system_prod_001"
      },
      "nodes": [
        {
          "parameters": {
            "pollTimes": {
              "item": [
                {
                  "mode": "everyDay",
                  "hour": 8
                }
              ]
            }
          },
          "id": "2d1a3c5a-d1e4-4d8b-a45b-389f417f7b11",
          "name": "Daily Trigger @ 8AM",
          "type": "n8n-nodes-base.cron",
          "typeVersion": 1,
          "position": [100, 300]
        },
        {
          "parameters": {
            "documentId": {"__placeholder__": "PASTE_YOUR_GOOGLE_SHEETS_SPREADSHEET_ID_HERE"},
            "sheetName": "New Leads",
            "options": {}
          },
          "id": "3c4b5a6d-e2f5-4e7c-a67b-118e39f8bc22",
          "name": "Read CRM New Leads",
          "type": "n8n-nodes-base.googleSheets",
          "typeVersion": 4,
          "position": [300, 300]
        },
        {
          "parameters": {
            "options": {
              "systemMessage": "You are Agent 0 — Chief Outreach Manager for Aakash Bambhaniya. Evaluate each incoming lead, orchestrate the custom variables, choose recommended channel (Email, LinkedIn, Instagram), and hand over task payloads to specialized writers."
            }
          },
          "id": "4d5c6b7a-f3e6-4f8d-b78c-229f40faab33",
          "name": "Agent 0 Orchestrator",
          "type": "n8n-nodes-base.advancedAiAgent",
          "typeVersion": 1,
          "position": [550, 300]
        },
        {
          "parameters": {
            "conditions": {
              "options": {
                "caseSensitive": true,
                "leftValue": "={{ $json.recommendedChannel }}",
                "type": "string"
              },
              "conditions": [
                {
                  "value1": "Email",
                  "value2": "Email",
                  "operator": "equal"
                }
              ]
            }
          },
          "id": "5e6d7c8b-a4f7-4a9e-c89d-33af41fbbc44",
          "name": "Route by Channel",
          "type": "n8n-nodes-base.switch",
          "typeVersion": 1,
          "position": [780, 300]
        },
        {
          "parameters": {
            "options": {
              "systemMessage": "You are Agent 2 — Email Writer for Aakash. Write high-conversion personal cold outreach emails matching the structure and value propositions exactly. Max 150 words."
            }
          },
          "id": "6f7e8d9c-b5f8-4b0f-d90e-44bf42fccd55",
          "name": "Agent 2 Email Writer",
          "type": "n8n-nodes-base.advancedAiAgent",
          "typeVersion": 1,
          "position": [1000, 150]
        },
        {
          "parameters": {
            "options": {
              "systemMessage": "You are Agent 3 — LinkedIn Writer for Aakash. Write personal connection requests (max 300 chars) and post-connect conversation openers."
            }
          },
          "id": "7a8b9c0d-c6f9-4c1f-e01f-55cf43fdee66",
          "name": "Agent 3 LinkedIn Writer",
          "type": "n8n-nodes-base.advancedAiAgent",
          "typeVersion": 1,
          "position": [1000, 300]
        },
        {
          "parameters": {
            "options": {
              "systemMessage": "You are Agent 4 — Instagram DM Writer for Aakash. Write casual, engaging, non-spammy DMs referencing recent e-commerce/agency posts."
            }
          },
          "id": "8b9c0d1e-d7f0-4d2f-f12f-66cf44feff77",
          "name": "Agent 4 Instagram Writer",
          "type": "n8n-nodes-base.advancedAiAgent",
          "typeVersion": 1,
          "position": [1000, 450]
        },
        {
          "parameters": {
            "documentId": {"__placeholder__": "PASTE_YOUR_GOOGLE_SHEETS_SPREADSHEET_ID_HERE"},
            "sheetName": "Outreach Log",
            "options": {}
          },
          "id": "9c0d1e2f-e8f1-4e3f-a23f-77cf45ffaa88",
          "name": "Update CRM Log",
          "type": "n8n-nodes-base.googleSheets",
          "typeVersion": 4,
          "position": [1300, 300]
        }
      ],
      "connections": {
        "Daily Trigger @ 8AM": {
          "main": [
            [
              {
                "node": "Read CRM New Leads",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Read CRM New Leads": {
          "main": [
            [
              {
                "node": "Agent 0 Orchestrator",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Agent 0 Orchestrator": {
          "main": [
            [
              {
                "node": "Route by Channel",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Route by Channel": {
          "main": [
            [
              {
                "node": "Agent 2 Email Writer",
                "type": "main",
                "index": 0
              }
            ],
            [
              {
                "node": "Agent 3 LinkedIn Writer",
                "type": "main",
                "index": 0
              }
            ],
            [
              {
                "node": "Agent 4 Instagram Writer",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Agent 2 Email Writer": {
          "main": [
            [
              {
                "node": "Update CRM Log",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Agent 3 LinkedIn Writer": {
          "main": [
            [
              {
                "node": "Update CRM Log",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Agent 4 Instagram Writer": {
          "main": [
            [
              {
                "node": "Update CRM Log",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workflowJSON, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "aakash_outreach_n8n_workflow.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('n8n Workflow JSON Blueprint downloaded successfully!', 'success');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{
        width: '280px',
        background: 'rgba(11, 15, 26, 0.95)',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 20
      }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Cpu size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff 30%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Outreach AI
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aakash Bambhaniya CRM</p>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'dashboard' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <TrendingUp size={18} /> Dashboard Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('crm')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'crm' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'crm' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <Database size={18} /> Outreach CRM Sheet
          </button>

          <button 
            onClick={() => setActiveTab('playground')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'playground' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'playground' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={18} /> Agent Playgound
          </button>

          <button 
            onClick={() => setActiveTab('n8n')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'n8n' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'n8n' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <Cpu size={18} /> n8n Node Blueprint
          </button>

          <button 
            onClick={() => setActiveTab('prompts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'prompts' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'prompts' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <FileText size={18} /> Prompts Vault
          </button>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-success)', boxShadow: '0 0 10px var(--accent-success)' }}></div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>System Active (2026-05-26)</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Header bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'crm' && 'Lead CRM Workspace'}
              {activeTab === 'playground' && 'Multi-Agent Sandbox'}
              {activeTab === 'n8n' && 'n8n Blueprint Downloader'}
              {activeTab === 'prompts' && 'System Prompts Vault'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              {activeTab === 'dashboard' && 'Monitor tracking, pipeline, and booking metrics.'}
              {activeTab === 'crm' && 'Manage raw leads, enrich details, and log interactions.'}
              {activeTab === 'playground' && 'Simulate Agents 1-5 to qualify and generate tailored cold outreach scripts.'}
              {activeTab === 'n8n' && 'Export and copy complete workflow nodes blueprint into your local n8n setup.'}
              {activeTab === 'prompts' && 'Verify and replicate the standard systems prompts for n8n AI agent nodes.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <label className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Database size={14} /> Import Google Sheets CSV
                <input 
                  type="file" 
                  accept=".csv" 
                  style={{ display: 'none' }} 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        const text = evt.target.result;
                        const lines = text.split('\n');
                        const newImportedLeads = [];
                        
                        // Simple CSV parser
                        for (let i = 1; i < lines.length; i++) {
                          const row = lines[i].split(',');
                          if (row.length >= 3 && row[0].trim()) {
                            newImportedLeads.push({
                              id: Date.now() + i,
                              name: row[0].replace(/"/g, '').trim(),
                              company: row[1].replace(/"/g, '').trim(),
                              industry: row[2]?.replace(/"/g, '').trim() || 'Tech startup',
                              title: row[3]?.replace(/"/g, '').trim() || 'Operations Manager',
                              channel: row[4]?.replace(/"/g, '').trim() || 'Email',
                              contactInfo: row[5]?.replace(/"/g, '').trim() || 'hello@company.com',
                              priority: row[12]?.replace(/"/g, '').trim() || 'Medium',
                              hook: row[13]?.replace(/"/g, '').trim() || 'Interested in automation workflow.',
                              painPoint: 'Struggling with manually syncing operational records between sheets.',
                              status: 'New',
                              dateContacted: '',
                              lastFollowUp: '',
                              nextFollowUp: '',
                              replyReceived: 'No',
                              replyContent: '',
                              notes: 'Imported from Google Sheets outreach CRM.'
                            });
                          }
                        }
                        
                        if (newImportedLeads.length > 0) {
                          setLeads(newImportedLeads);
                          setSelectedLead(newImportedLeads[0]);
                          showToast(`Successfully imported ${newImportedLeads.length} leads from Google Sheets! Dummy leads deleted.`, 'success');
                        } else {
                          showToast('No valid rows found in CSV!', 'error');
                        }
                      };
                      reader.readAsText(file);
                    }
                  }} 
                />
              </label>
            </div>
            <button className="btn-secondary" onClick={() => showToast('Synced Outreach Sheet state successfully!')}>
              <RefreshCw size={16} /> Sync CRM
            </button>
            <button className="btn-primary" onClick={downloadN8NWorkflow}>
              <Download size={16} /> Get n8n Template
            </button>
          </div>
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Stat Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total Leads Tracked</p>
                  <h3 style={{ fontSize: '2.25rem', marginTop: '8px' }}>{leads.length}</h3>
                </div>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                  <Users size={24} />
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Leads Contacted</p>
                  <h3 style={{ fontSize: '2.25rem', marginTop: '8px' }}>
                    {leads.filter(l => l.status !== 'New').length}
                  </h3>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-warning)' }}>
                  <Send size={24} />
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Replies Received</p>
                  <h3 style={{ fontSize: '2.25rem', marginTop: '8px' }}>
                    {leads.filter(l => l.replyReceived === 'Yes').length}
                  </h3>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-success)' }}>
                  <MessageSquare size={24} />
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Call Bookings / Hot Leads</p>
                  <h3 style={{ fontSize: '2.25rem', marginTop: '8px' }}>
                    {leads.filter(l => l.status === 'Interested').length}
                  </h3>
                </div>
                <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-secondary)' }}>
                  <UserCheck size={24} />
                </div>
              </div>
            </div>

            {/* Middle Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px' }}>
              
              {/* Hot Actions List */}
              <div className="glass-card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="var(--accent-primary)" /> High-Priority Outreach Opportunities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {leads.filter(l => l.priority === 'High' && l.status === 'New').map(lead => (
                    <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 600 }}>{lead.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>• {lead.company}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Hook: {lead.hook.substring(0, 90)}...
                        </p>
                      </div>
                      <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => { setSelectedLead(lead); setActiveTab('playground'); }}>
                        Write {lead.channel} Script <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                  {leads.filter(l => l.priority === 'High' && l.status === 'New').length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
                      All high priority new leads have been contacted! Great job Aakash.
                    </p>
                  )}
                </div>
              </div>

              {/* Free Tools Configuration Stack Info */}
              <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Active Tools stack</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Workflow Engine</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>n8n self-hosted</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>CRM Database</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-success)' }}>Google Sheets (Free CRM)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>LinkedIn Finder</span>
                    <span style={{ fontWeight: 600 }}>Apollo.io (Free Tier)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Instagram Outreach</span>
                    <span style={{ fontWeight: 600 }}>Manual + n8n HTTP Node</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '12px', marginTop: 'auto' }}>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.4', color: 'var(--accent-primary)' }}>
                    💡 <strong>Pro Tip:</strong> Ensure your Google Sheets columns match the CRM tab exactly for the n8n automation nodes to sync flawlessly.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CRM Workspace Tab */}
        {activeTab === 'crm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Quick Add Form & Search */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
              
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={18} /> Quick Add Raw Lead (Simulate Agent 1 Lead Researcher)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                  <input 
                    type="text" 
                    placeholder="Lead Full Name" 
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', color: 'white' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={newLeadCompany}
                    onChange={(e) => setNewLeadCompany(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', color: 'white' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Job Title" 
                    value={newLeadTitle}
                    onChange={(e) => setNewLeadTitle(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', color: 'white' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
                  <select 
                    value={newLeadChannel} 
                    onChange={(e) => setNewLeadChannel(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', color: 'white' }}
                  >
                    <option value="Email" style={{ background: '#111' }}>Email Outreach</option>
                    <option value="LinkedIn" style={{ background: '#111' }}>LinkedIn Note</option>
                    <option value="Instagram" style={{ background: '#111' }}>Instagram DM</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Personalization Hook (recent post / post content)" 
                    value={newLeadHook}
                    onChange={(e) => setNewLeadHook(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', color: 'white' }}
                  />
                </div>
                <button className="btn-primary" onClick={addNewLead}>
                  <Sparkles size={16} /> Enrich & Create Lead
                </button>
              </div>

              <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Search CRM Data</h3>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search by name, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '12px 12px 12px 36px', color: 'white' }}
                  />
                </div>
              </div>

            </div>

            {/* CRM Data Grid */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Lead Details</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Company & Title</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Channel & Contact</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Priority</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(lead => (
                      <tr 
                        key={lead.id} 
                        style={{ borderBottom: '1px solid var(--border-light)', cursor: 'pointer', background: selectedLead?.id === lead.id ? 'rgba(99, 102, 241, 0.03)' : 'transparent' }}
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ fontWeight: 600, display: 'block' }}>{lead.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.location}</span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ display: 'block', fontWeight: 500 }}>{lead.company}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{lead.title}</span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                            {lead.channel === 'Email' && <Mail size={14} color="var(--accent-primary)" />}
                            {lead.channel === 'LinkedIn' && <Send size={14} color="var(--accent-info)" />}
                            {lead.channel === 'Instagram' && <Send size={14} color="var(--accent-secondary)" />}
                            {lead.contactInfo}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            fontSize: '0.8rem', 
                            fontWeight: 600,
                            color: lead.priority === 'High' ? 'var(--accent-secondary)' : lead.priority === 'Medium' ? 'var(--accent-warning)' : 'var(--text-muted)'
                          }}>
                            {lead.priority}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span className={`badge ${getStatusBadgeClass(lead.status)}`}>{lead.status}</span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ fontSize: '0.85rem', color: lead.replyReceived === 'Yes' ? 'var(--accent-success)' : 'var(--text-muted)' }}>
                            {lead.replyReceived === 'Yes' ? `Replied: "${lead.replyContent.substring(0, 30)}..."` : 'No reply yet'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Agent Playground Tab */}
        {activeTab === 'playground' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            
            {/* Left: Lead Profiler & Researcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Select Lead to Qualify</h3>
                
                {leads.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', padding: '10px 0' }}>No leads tracked yet. Add one in CRM first!</p>
                ) : (
                  <>
                  <select 
                    value={selectedLead?.id || ''}
                    onChange={(e) => {
                      const l = leads.find(le => le.id === Number(e.target.value));
                      setSelectedLead(l);
                      setSimulatedReplyDraft('');
                    }}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '12px', color: 'white', marginBottom: '20px' }}
                  >
                    {leads.map(l => (
                      <option key={l.id} value={l.id} style={{ background: '#111' }}>
                        {l.name} ({l.company}) — {l.priority} Priority
                      </option>
                    ))}
                  </select>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '1rem', color: 'var(--accent-primary)' }}>Qualifying Profile (Agent 1 Output)</h4>
                      <span className={`badge ${getStatusBadgeClass(selectedLead?.status)}`}>{selectedLead?.status}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                      <div>
                        <strong style={{ color: 'var(--text-secondary)' }}>Current Hook:</strong>
                        <p style={{ marginTop: '4px', lineHeight: '1.4' }}>{selectedLead?.hook}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--text-secondary)' }}>Automation Pain Point:</strong>
                        <p style={{ marginTop: '4px', lineHeight: '1.4' }}>{selectedLead?.painPoint}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                        <div>
                          <strong style={{ color: 'var(--text-secondary)' }}>Target Channel:</strong>
                          <span style={{ display: 'block', marginTop: '4px' }}>{selectedLead?.channel}</span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-secondary)' }}>Priority:</strong>
                          <span style={{ display: 'block', marginTop: '4px', color: 'var(--accent-warning)' }}>{selectedLead?.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                )}
              </div>

              {/* Agent 5 - Follow-Up and Reply Simulator */}
              {selectedLead && (
                <div className="glass-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Cpu size={18} color="var(--accent-secondary)" />
                    <h3 style={{ fontSize: '1.25rem' }}>Agent 5 — Follow-Up & Reply Handler</h3>
                  </div>
                  
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Select the lead response type below to trigger Agent 5 auto-qualification logic and construct a premium reply draft immediately.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    <button className="btn-secondary" onClick={() => handleSimulateReply('Interested')}>
                      "Interested / Tell me more"
                    </button>
                    <button className="btn-secondary" onClick={() => handleSimulateReply('Pricing')}>
                      "How much do you charge?"
                    </button>
                    <button className="btn-secondary" onClick={() => handleSimulateReply('Not interested')}>
                      "Not interested"
                    </button>
                    <button className="btn-secondary" onClick={() => handleSimulateReply('Rude')}>
                      "Rude / DNC"
                    </button>
                  </div>

                  {simulatedReplyDraft && (
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent-success)', fontWeight: 600 }}>AUTO RESPONSE READY</span>
                        <button 
                          style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => copyToClipboard(simulatedReplyDraft, 'Reply script copied!')}
                        >
                          <Copy size={14} /> Copy Draft
                        </button>
                      </div>
                      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                        {simulatedReplyDraft}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Tailored Copywrite outputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-card" style={{ padding: '24px' }}>
                {!selectedLead ? (
                  <div style={{ textAlign: 'center', padding: '40px color: var(--text-muted)' }}>
                    <AlertCircle size={32} style={{ marginBottom: '12px', color: 'var(--accent-primary)' }} />
                    <p>Select or add a lead to see personal outreach scripts instantly!</p>
                  </div>
                ) : (
                  <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>Personalized Outreach Scripts</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Customized as Aakash</span>
                  </div>

                  {selectedLead.channel === 'Email' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)' }}>
                        <Mail size={18} />
                        <h4 style={{ fontWeight: 600 }}>Agent 2 — Gmail Outreach script</h4>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Subject:</span>
                          <span style={{ fontWeight: 600 }}>{generateEmail(selectedLead).subject}</span>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => copyToClipboard(generateEmail(selectedLead).subject, 'Subject line copied!')}>
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>

                      <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', position: 'relative' }}>
                        <button 
                          style={{ position: 'absolute', right: '16px', top: '16px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} 
                          onClick={() => copyToClipboard(generateEmail(selectedLead).body, 'Email body copied!')}
                        >
                          <Copy size={16} />
                        </button>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', fontFamily: 'monospace', lineHeight: '1.5' }}>
                          {generateEmail(selectedLead).body}
                        </pre>
                      </div>
                    </div>
                  )}

                  {selectedLead.channel === 'LinkedIn' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-info)' }}>
                        <Send size={18} />
                        <h4 style={{ fontWeight: 600 }}>Agent 3 — LinkedIn Outreach scripts</h4>
                      </div>

                      {/* Step 1 */}
                      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--accent-info)' }}>CONNECTION NOTE (Max 300 Chars)</strong>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => copyToClipboard(generateLinkedIn(selectedLead).connectionNote, 'Connection Note copied!')}>
                            <Copy size={14} />
                          </button>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>"{generateLinkedIn(selectedLead).connectionNote}"</p>
                      </div>

                      {/* Step 2 */}
                      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--accent-info)' }}>FIRST DM (After Connection)</strong>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => copyToClipboard(generateLinkedIn(selectedLead).firstDM, 'First DM copied!')}>
                            <Copy size={14} />
                          </button>
                        </div>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', fontFamily: 'monospace' }}>{generateLinkedIn(selectedLead).firstDM}</pre>
                      </div>

                      {/* Step 3 */}
                      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--accent-info)' }}>FOLLOW-UP DM (If No Response)</strong>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => copyToClipboard(generateLinkedIn(selectedLead).followUpDM, 'Follow-up DM copied!')}>
                            <Copy size={14} />
                          </button>
                        </div>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', fontFamily: 'monospace' }}>{generateLinkedIn(selectedLead).followUpDM}</pre>
                      </div>
                    </div>
                  )}

                  {selectedLead.channel === 'Instagram' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-secondary)' }}>
                        <Send size={18} />
                        <h4 style={{ fontWeight: 600 }}>Agent 4 — Instagram Outreach DM</h4>
                      </div>

                      {/* Cold Outreach DM */}
                      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)' }}>FIRST DM (Casual Style)</strong>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => copyToClipboard(generateInstagram(selectedLead).firstDM, 'First IG DM copied!')}>
                            <Copy size={14} />
                          </button>
                        </div>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', fontFamily: 'monospace', lineHeight: '1.4' }}>{generateInstagram(selectedLead).firstDM}</pre>
                      </div>

                      {/* Follow Up */}
                      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)' }}>FOLLOW-UP IG DM</strong>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => copyToClipboard(generateInstagram(selectedLead).followUpDM, 'Follow-up IG DM copied!')}>
                            <Copy size={14} />
                          </button>
                        </div>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', fontFamily: 'monospace', lineHeight: '1.4' }}>{generateInstagram(selectedLead).followUpDM}</pre>
                      </div>
                    </div>
                  )}
                  </>
                )}
              </div>
            </div>

          </div>
        )}

        {/* n8n Node Blueprint Tab */}
        {activeTab === 'n8n' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3rem' }}>Workflow Orchestrator Blueprint</h3>
                <button className="btn-primary" onClick={downloadN8NWorkflow}>
                  <Download size={16} /> Download JSON Blueprint
                </button>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                To import this multi-agent mesh into your n8n builder:
                <br />
                1. Click the button above to download the <code>aakash_outreach_n8n_workflow.json</code> file.
                <br />
                2. Open your self-hosted **n8n interface**, click **New Workflow**, and press <code>Ctrl+V</code> or select **Import from File**.
                <br />
                3. Configure your Google Sheets Node credentials to bind your tracking spreadsheet columns automatically.
              </p>

              {/* Node Layout Flowchart Simulation */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid var(--accent-primary)', padding: '10px 20px', borderRadius: '8px' }}>
                  <Clock size={16} /> Daily Cron Node (8:00 AM IST)
                </div>
                <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-success)', padding: '10px 20px', borderRadius: '8px' }}>
                  <Database size={16} /> Google Sheets Node (Read CRM Leads)
                </div>
                <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid var(--accent-secondary)', padding: '10px 20px', borderRadius: '8px' }}>
                  <Cpu size={16} /> Agent 0 Orchestrator (Manager Agent)
                </div>
                
                <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(120deg)' }} />
                    <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem' }}>
                      Agent 2 Email Writer Node
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
                    <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem' }}>
                      Agent 3 LinkedIn Writer Node
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(60deg)' }} />
                    <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem' }}>
                      Agent 4 Instagram Writer Node
                    </div>
                  </div>
                </div>

                <ChevronRight size={20} style={{ transform: 'rotate(90deg)', marginTop: '16px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-success)', padding: '10px 20px', borderRadius: '8px' }}>
                  <CheckCircle size={16} /> Google Sheets Node (Log Action + Dates)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prompts Vault Tab */}
        {activeTab === 'prompts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.20rem', marginBottom: '16px' }}>AGENTS SYSTEM PROMPTS PACK</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Review and quickly copy the high-impact system prompts customized for Aakash Bambhaniya's outreach workflows.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--accent-primary)' }}>👑 Agent 0 — Chief Outreach Manager</strong>
                    <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => showToast('Agent 0 prompt copied!')}>
                      <Copy size={14} /> Copy
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.01)', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    You are the Chief Outreach Manager working on behalf of Aakash Bambhaniya, founder of an automation services business. Sells: Automation services (n8n, Make, Zapier, AI workflows). Rule: Never claim to be an AI, personalize every outreach message...
                  </pre>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--accent-primary)' }}>🔍 Agent 1 — Lead Researcher</strong>
                    <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => showToast('Agent 1 prompt copied!')}>
                      <Copy size={14} /> Copy
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.01)', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    You are the Lead Research Agent for Aakash Bambhaniya's automation services business. Find and qualify leads... Return layout: LEAD PROFILE, PAIN POINT IDENTIFIED, PERSONALIZATION HOOK, RECOMMENDED CHANNEL...
                  </pre>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--accent-primary)' }}>📧 Agent 2 — Cold Email Writer</strong>
                    <button style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => showToast('Agent 2 prompt copied!')}>
                      <Copy size={14} /> Copy
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.01)', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    You are the Email Outreach Agent for Aakash Bambhaniya... Write human, highly personal cold outreach emails following the Hook-Problem-Solution-Proof-CTA framework. Body max 150 words.
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Global Toast Alert simulation */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#10b981',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 100,
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.95rem'
        }}>
          <CheckCircle size={16} /> {toast.message}
        </div>
      )}

    </div>
  );
}

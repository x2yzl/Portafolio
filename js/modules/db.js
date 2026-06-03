;(function() {
  'use strict';

  var SUPABASE_URL = 'https://armpwaiwsulmjnlvgkwi.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_OP6ZKev-oWto07FQPyub5g_YXo77r_I';

  var headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };

  function api(path, opts) {
    return fetch(SUPABASE_URL + '/rest/v1/' + path, {
      headers: headers,
      method: (opts && opts.method) || 'GET',
      body: (opts && opts.body) || undefined,
    }).then(function(r) {
      if (r.status === 204) return null;
      if (!r.ok) return r.json().then(function(e) { throw new Error(e.message || 'Supabase error'); });
      return r.json();
    });
  }

  function getSkills() {
    return api('skills?order=id.asc');
  }

  function addSkill(data) {
    return api('skills', { method: 'POST', body: JSON.stringify(data) });
  }

  function updateSkill(id, data) {
    return api('skills?id=eq.' + id, { method: 'PATCH', body: JSON.stringify(data) });
  }

  function deleteSkill(id) {
    return api('skills?id=eq.' + id, { method: 'DELETE' });
  }

  function getProjects() {
    return api('projects?order=id.asc');
  }

  function addProject(data) {
    return api('projects', { method: 'POST', body: JSON.stringify(data) });
  }

  function updateProject(id, data) {
    return api('projects?id=eq.' + id, { method: 'PATCH', body: JSON.stringify(data) });
  }

  function deleteProject(id) {
    return api('projects?id=eq.' + id, { method: 'DELETE' });
  }

  window.db = {
    getSkills: getSkills,
    addSkill: addSkill,
    updateSkill: updateSkill,
    deleteSkill: deleteSkill,
    getProjects: getProjects,
    addProject: addProject,
    updateProject: updateProject,
    deleteProject: deleteProject,
  };
})();

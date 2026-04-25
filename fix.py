import re

with open('src/components/dashboard/AddAssetButton.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <SubModal activeSubModal={activeSubModal} setActiveSubModal={setActiveSubModal} />
# with <SubModal activeSubModal={activeSubModal} setActiveSubModal={setActiveSubModal} onSave={handleSubModalSave} />
content = content.replace(
    '<SubModal activeSubModal={activeSubModal} setActiveSubModal={setActiveSubModal} />',
    '<SubModal activeSubModal={activeSubModal} setActiveSubModal={setActiveSubModal} onSave={handleSubModalSave} />'
)

# Find all target names first
targets = set(re.findall(r"handleDropdownAction\(e,\s*'([a-zA-Z_]+)'\)", content))

for target in targets:
    # Find the select block
    block_pattern = re.compile(r'(<select\s+className=\{styles\.inputField\}[^>]*?onChange=\{\(e\)\s*=>\s*handleDropdownAction\(e,\s*\'' + target + r'\'\)\}[^>]*?>)(.*?)(</select>)', re.DOTALL)
    
    def block_replacer(m):
        start_tag = m.group(1)
        inner = m.group(2)
        end_tag = m.group(3)
        
        # Add value to start_tag
        if 'value={' not in start_tag:
            start_tag = start_tag.replace('className={styles.inputField}', f'className={{styles.inputField}} value={{dropdownValues[\"{target}\"] || \"\"}}')
            
        dyn_options = f'{{(dropdownOptions[\"{target}\"] || []).map(opt => <option key={{opt}} value={{opt}}>{{opt}}</option>)}}'
        if '<option value="ADD_NEW">+ Add New</option>' in inner:
            inner = inner.replace('<option value="ADD_NEW">+ Add New</option>', f'{dyn_options}\n<option value="ADD_NEW">+ Add New</option>')
        
        return start_tag + inner + end_tag
        
    content = block_pattern.sub(block_replacer, content)

# Special case for mutual_funds where target is dynamic
mf_pattern = re.compile(r'(<select\s+className=\{styles\.inputField\}[^>]*?onChange=\{\(e\)\s*=>\s*handleDropdownAction\(e,\s*assetClass === \'sif\' \? \'add_sif\' : \'add_mutual_fund\'\)\}[^>]*?>)(.*?)(</select>)', re.DOTALL)
def mf_replacer(m):
    start_tag = m.group(1)
    inner = m.group(2)
    end_tag = m.group(3)
    
    if 'value={' not in start_tag:
        start_tag = start_tag.replace('className={styles.inputField}', 'className={styles.inputField} value={dropdownValues[assetClass === \'sif\' ? \'add_sif\' : \'add_mutual_fund\'] || \'\'}')
        
    dyn_options = "{(dropdownOptions[assetClass === 'sif' ? 'add_sif' : 'add_mutual_fund'] || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}"
    if '<option value="ADD_NEW">+ Add New</option>' in inner:
        inner = inner.replace('<option value="ADD_NEW">+ Add New</option>', f'{dyn_options}\n<option value="ADD_NEW">+ Add New</option>')
    
    return start_tag + inner + end_tag
content = mf_pattern.sub(mf_replacer, content)

with open('src/components/dashboard/AddAssetButton.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

module.exports = data => {
  const extractLabels = ({labels}) => labels;
  const allLabels = data.map(extractLabels);
  const fLabels = Array.prototype.concat(...allLabels); // flatten
  const dLabels = fLabels.filter(label => typeof label !== 'undefined');
  const uniqueLabels = unique(dLabels);
  return uniqueLabels;
};

const unique = labels => labels.reduce((prev, curr) => {
  const found = prev.find(label => label.id === curr.id);
  if (!found) prev.push(curr);
  return prev;
}, []);

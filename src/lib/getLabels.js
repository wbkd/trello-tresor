module.exports = data => {
  const extractLabels = ({labels}) => labels;
  const allLabels = data.map(extractLabels);
  const fLabels = Array.prototype.concat(...allLabels); // flatten
  const uniqueLabels = unique(fLabels);
  console.log(uniqueLabels)
  return uniqueLabels;
};

const unique = labels => {
  const foundLabels = [];
  return labels.filter(label => {
    const found = foundLabels.find(foundLabel => foundLabel.id === label.id);
    if (!found) {
      foundLabels.push(label);
      return label;
    } else {
      return;
    }
  });
}
